class Task {
  constructor(className) {
    this.element = document.querySelector(`.${className}`);
    this.element.innerHTML += `<div class="task"></div>`;
  }

  remove(className) {
    this.element.querySelector(".task").remove();
  }
}

// const callStack = new Task("call-stack-area");
// const webApis = new Task("web-apis-area");
// const microQueue = new Task("micro-queue");
// const macroQueue = new Task("macro-queue");

export default Task;
