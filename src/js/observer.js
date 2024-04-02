export function CallStackObserver(elementId) {
  this.callStackElement = document.getElementById(elementId);

  this.update = function (callStack) {
    const currentCall = callStack[callStack.length - 1];
    this.callStackElement.innerHTML = `<div class="task">${currentCall}</div>`;
  };
}

export function WebAPIObserver(elementId) {
  this.webAPIEl = document.getElementById(elementId);

  this.update = function (webAPIStack) {
    const currentCall = webAPIStack[webAPIStack.length - 1];
    const callbackBox = document.createElement('div');
    // callbackBox.classList.add('task');
    callbackBox.innerText = currentCall.arguments;
    this.webAPIEl.appendChild(callbackBox);
  };
}
