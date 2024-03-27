import {
  MACRO_TASK_PROTOTYPES,
  MICRO_TASK_PROTOTYPES,
  Macrotask,
  Microtask,
} from "../model/Callback.js";
import CodeAnalyzer from "../model/CodeAnalyzer.js";
import { ComponentBox } from "../model/ComponentBox.js";
import { updateComponents } from "../view/Component.js";

const CLASS_NAME = {
  CALL_STACK: "call-stack",
  WEB_APIS: "web-apis",
  MICRO_TASK: "microtask-queue",
  MACRO_TASK: "macrotask-queue",
};

const isMicrotask = (callback) =>
  Object.keys(MICRO_TASK_PROTOTYPES).includes(callback.calleeName);

const isMacrotask = (callback) =>
  Object.keys(MACRO_TASK_PROTOTYPES).includes(callback.calleeName);

export default class EventLoopVisualizer {
  inputArea = document.querySelector(".input-view__text-input");
  submitButton = document.querySelector(".input-view__submit");
  componentBox = {};

  constructor() {
    this.componentBox.callStack = new ComponentBox(CLASS_NAME.CALL_STACK);
    this.componentBox.webApis = new ComponentBox(CLASS_NAME.WEB_APIS);
    this.componentBox.microTasks = new ComponentBox(CLASS_NAME.MICRO_TASK);
    this.componentBox.macroTasks = new ComponentBox(CLASS_NAME.MACRO_TASK);
    this.codeAnalyzer = new CodeAnalyzer();
    this.initializeEventListener();
    this.initializeSubscribes();
  }

  initializeEventListener() {
    this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  initializeSubscribes() {
    const componentBoxList = Object.values(this.componentBox);

    componentBoxList.forEach((box) => box.subscribe(updateComponents));
  }

  setCallbacks(code) {
    this.codeAnalyzer.initializeCallbacks(code);
    const callbacks = this.codeAnalyzer.getCallbacks();

    this.setComponents(callbacks);
  }

  setComponents(callbacks) {
    const components = callbacks.map((callback, index) => {
      if (isMicrotask(callback))
        return new Microtask(callback.node, callback.calleeName, index);
      if (isMacrotask(callback))
        return new Macrotask(callback.node, callback.calleeName, index);
    });

    this.componentBox.webApis.setComponents(components);
  }

  handleSubmit(e) {
    const codeInput = this.inputArea.value;

    e.preventDefault();
    this.setCallbacks(codeInput);
  }
}
