export function CallStackObserver(elementId) {
  this.callStackElement = document.getElementById(elementId);

  this.update = function (callStack) {
    if (callStack.length === 0) {
      this.callStackElement.innerHTML = '';
    } else {
      const currentCall = callStack[callStack.length - 1];
      this.callStackElement.innerHTML = `<div class="task">${currentCall}</div>`;
    }
  };
}

export function CallbackObserver(elementId, animation) {
  this.boxEl = document.getElementById(elementId);

  this.update = function (tasks) {
    // const currentCall = webAPIStack[webAPIStack.length - 1];
    // const callbackBox = document.createElement('div');
    // callbackBox.classList.add('task', animation);
    // callbackBox.innerText = currentCall.arguments;
    // this.webAPIEl.appendChild(callbackBox);
    const html = tasks
      .map((task, index) => {
        const animationClass = index === tasks.length - 1 ? animation : '';
        return `<div class="task ${animationClass}">${task.arguments}</div>`;
      })
      .join('');
    this.boxEl.innerHTML = html;
  };
}

export function RemoveCallback(elementId) {
  this.boxEl = document.getElementById(elementId);

  this.update = function (tasks) {
    if (tasks.length === 0) {
      this.boxEl.innerHTML = '';
    } else {
      console.log(tasks);
      const html = tasks
        .map((task) => `<div class="task">${task.arguments}</div>`)
        .join('');
      this.boxEl.innerHTML = html;
    }
  };
}
