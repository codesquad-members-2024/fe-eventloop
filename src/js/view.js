const microTasks = ["process", "Promise", "async", "then"];
const macroTasks = ["setTimeout", "setInterval"];

class Task {
  constructor(className) {
    this.className = className;
    this.element = document.querySelector(`.${className}`);
  }

  removeTask() {
    this.element.innerHTML = "";
  }

  appendTask(calleeName) {
    this.element.innerHTML = `<div class="task">${calleeName}</div>`;
    setTimeout(() => {
      this.removeTask();
    }, 2000);
  }
}

function moveTasks(tasks) {
  const callStack = new Task("call-stack-area");
  const webApis = new Task("web-apis-area");
  const microQueue = new Task("micro-queue");
  const macroQueue = new Task("macro-queue");

  let delay = 0;
  tasks.forEach((task) => {
    setTimeout(() => {
      callStack.appendTask(task);
    }, delay);

    setTimeout(() => {
      webApis.appendTask(task + " cb");
    }, delay + 2000);

    setTimeout(() => {
      setTimeout(() => {
        if (microTasks.includes(task)) {
          microQueue.appendTask(task + "cb");
        } else if (macroTasks.includes(task)) {
          macroQueue.appendTask(task + "cb");
        }
      }, 2000);
    }, delay + 2000);
    delay += 4000;
  });
}

// const tasks = ["then", "then", "setTimeout"]; //, "then", "setTimeout"

export default moveTasks;
