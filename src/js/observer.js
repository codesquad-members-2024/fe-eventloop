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
  this.webAPIEl = document.getElementById(elementId);

  this.update = function (webAPIStack) {
    const currentCall = webAPIStack[webAPIStack.length - 1];
    const callbackBox = document.createElement('div');
    callbackBox.classList.add('task', animation);
    callbackBox.innerText = currentCall.arguments;
    this.webAPIEl.appendChild(callbackBox);
  };
}
