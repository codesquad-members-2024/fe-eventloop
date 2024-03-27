import {
  MACRO_TASK_PROTOTYPES,
  MICRO_TASK_PROTOTYPES,
  Macrotask,
  Microtask,
} from "../model/Callback.js";
import CodeAnalyzer from "../model/CodeAnalyzer.js";
import { ComponentBox } from "../model/ComponentBox.js";

const isMicrotask = (callback) =>
  Object.keys(MICRO_TASK_PROTOTYPES).includes(callback.calleeName);

const isMacrotask = (callback) =>
  Object.keys(MACRO_TASK_PROTOTYPES).includes(callback.calleeName);

export class EventLoopVisualizer {
  inputArea = document.querySelector(".input-view__text-input");
  submitButton = document.querySelector(".input-view__submit");
  componentBox = {};

  constructor() {
    this.componentBox.callStack = new ComponentBox();
    this.componentBox.webApis = new ComponentBox();
    this.componentBox.microTasks = new ComponentBox();
    this.componentBox.macroTasks = new ComponentBox();
    this.codeAnalyzer = new CodeAnalyzer();
    this.initializeEventListener();
  }

  initialize(code) {
    this.codeAnalyzer.initializeCallbacks(code);
    const callbacks = this.codeAnalyzer.getCallbacks();

    this.initializeComponents(callbacks);
  }

  initializeEventListener() {
    this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  initializeComponents(callbacks) {
    const components = callbacks.map((callback, index) => {
      if (isMicrotask(callback))
        return new Microtask(callback.node, callback.calleeName, index+1);
      if (isMacrotask(callback))
        return new Macrotask(callback.node, callback.calleeName, index+1);
    });

    this.componentBox.webApis.setComponents(components);
  }

  handleSubmit(e) {
    const codeInput = this.inputArea.value;

    e.preventDefault();
    this.initialize(codeInput);
  }
}
