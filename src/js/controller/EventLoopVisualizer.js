import CodeAnalyzer from "../model/CodeAnalyzer.js";
import { ComponentBox } from "../model/EventLoopSystem.js";

export class EventLoopVisualizer {
  inputArea = document.querySelector(".input-view__text-input");
  submitButton = document.querySelector(".input-view__submit");

  constructor() {
    this.callStack = new ComponentBox();
    this.webApis = new ComponentBox();
    this.microTasks = new ComponentBox();
    this.macroTasks = new ComponentBox();
    this.codeAnalyzer = new CodeAnalyzer();
    this.initializeEventListener();
  }

  initialize(code) {
    this.codeAnalyzer.initializeCallbacks(code);
  }

  initializeEventListener() {
    this.submitButton.addEventListener("click", (this.handleSubmit).bind(this));
  }

  handleSubmit(e) {
    const codeInput = this.inputArea.value;

    e.preventDefault();
    this.initialize(codeInput);
  }
}