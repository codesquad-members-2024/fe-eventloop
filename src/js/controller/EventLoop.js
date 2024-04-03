import { MACRO_TASK_PROTOTYPES, MICRO_TASK_PROTOTYPES, Macrotask, Microtask } from "../model/Callback.js";
import { parseLiteral } from "../model/CodeParser.js";
import { renderComponents } from "../view/Components.js";

const FIRST_INDEX = 0;

const isMicrotask = (callback) => Object.keys(MICRO_TASK_PROTOTYPES).includes(callback.calleeName);

const isMacrotask = (callback) => Object.keys(MACRO_TASK_PROTOTYPES).includes(callback.calleeName);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const transferFirstComponent = (source, target) => {
  const components = source.getComponents();
  if (components.length === NO_ELEMENTS) return false;

  const component = components.shift();
  target.setComponents([...target.getComponents(), component]);
  source.setComponents([...components]);
  return true;
};

export class EventLoop {
  submitButton = document.querySelector(".submit-btn");
  inputArea = document.getElementById("codeInput");

  constructor(componentBox) {
    this.componentBox = componentBox;
    this.initializeEventListener();
    this.initializeSubscribes();
  }

  handleSubmit = () => {
    const code = this.inputArea.value;

    this.setComponents(code);
  }

  initializeEventListener() {
    this.submitButton.addEventListener("click", this.handleSubmit);
  }

  initializeSubscribes() {
    const componentBoxList = Object
      .values(this.componentBox)
      .filter((box) => box !== this.componentBox.callbacks);

    componentBoxList.forEach((box) => box.subscribe(renderComponents))
  }

  setComponents(code) {
    const callbackLiterals = parseLiteral(code).map((literal) => {
      if (isMicrotask(literal)) return new Microtask(literal.callback, literal.calleeName);
      if (isMacrotask(literal)) return new Macrotask(literal.callback, literal.calleeName);
    });

    this.componentBox.callbacks.setComponents(callbackLiterals);
  }

  updateComponents() {
    const { callbacks, callStack, webApis, microTask, macroTask } = this.componentBox;
    const firstCallback = callbacks.getComponents()[FIRST_INDEX];
    const firstComponent = webApis.getComponents()[FIRST_INDEX];

    if (firstCallback) {
      transferFirstComponent(callbacks, callStack);
      transferFirstComponent(callStack, webApis);
    }
    if (firstComponent && firstComponent instanceof Microtask && transferFirstComponent(webApis, microTask)) return;
    if (firstComponent && firstComponent instanceof Macrotask && transferFirstComponent(webApis, macroTask)) return;
    if (transferFirstComponent(microTask, callStack) || transferFirstComponent(macroTask, callStack)) return;
  }
}