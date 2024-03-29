const microTasks = ["process", "Promise", "async", "then"];
const macroTasks = ["setTimeout", "setInterval"];
const TASK_DELAY = 3000;

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
    }, TASK_DELAY);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moveTasks(tasks) {
  const callStack = new Task("call-stack-area");
  const webApis = new Task("web-apis-area");
  const microQueue = new Task("micro-queue");
  const macroQueue = new Task("macro-queue");

  for (const task of tasks) {
    await delay(TASK_DELAY);
    callStack.appendTask(task);

    await delay(TASK_DELAY);
    webApis.appendTask(task + " cb");

    await delay(TASK_DELAY);
    if (microTasks.includes(task)) {
      microQueue.appendTask(task + " cb");
    } else if (macroTasks.includes(task)) {
      macroQueue.appendTask(task + " cb");
    }

    await delay(TASK_DELAY);
    callStack.appendTask(task + " cb");
  }
}

export default moveTasks;
