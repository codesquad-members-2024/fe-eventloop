export function CallStackViewer(elementId) {
  this.callStackElement = document.getElementById(elementId);
}

CallStackViewer.prototype.update = function (callStack) {
  if (callStack.length === 0) {
    this.callStackElement.innerHTML = '';
  } else {
    const currentCall = callStack[callStack.length - 1];
    this.callStackElement.innerHTML = `<div class="task">${currentCall}</div>`;
  }
};

export function CallbackAdder(elementId, animation) {
  this.boxEl = document.getElementById(elementId);
  this.animation = animation;
}

CallbackAdder.prototype.update = function (tasks) {
  const html = tasks
    .map((task, index) => {
      const animationClass = index === tasks.length - 1 ? this.animation : '';
      return `<div class="task ${animationClass}">${task.callback}</div>`;
    })
    .join('');
  this.boxEl.innerHTML = html;
};

export function CallbackRemover(elementId) {
  this.boxEl = document.getElementById(elementId);
}

CallbackRemover.prototype.update = function (tasks) {
  const html = tasks
    .map((task) => `<div class="task">${task.callback}</div>`)
    .join('');
  this.boxEl.innerHTML = html;
};

export function animateQueueToCallstack(tasks, i, elementId, animationClass) {
  const box = document.getElementById(elementId);
  const movedTask = `<div class="task ${animationClass}">${tasks[i].callback}</div>`;
  const restOfTask = tasks
    .slice(i + 1, tasks.length)
    .map((task) => `<div class="task">${task.callback}</div>`)
    .join('');
  box.innerHTML = movedTask + restOfTask;
}
