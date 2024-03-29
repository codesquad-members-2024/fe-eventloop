const eventloop = {
  callStack: [],
  webApi: [],
  macroQueue: [],
  microQueue: [],
};

export function controllEventLoop(callbacks) {
  const numOfCallbacks = callbacks.length;
  moveCallstackToWebApi(callbacks, numOfCallbacks);
}

function moveCallstackToWebApi(callbacks, numOfCallbacks) {
  const intervalId = setInterval(() => {
    if (callbacks.length > 0) {
      const currentCall = callbacks.shift();
      eventloop.callStack.push(currentCall);
      viewCallStack(currentCall);
      setTimeout(() => {
        eventloop.webApi.push(currentCall);
        viewWebAPIs(currentCall);
      }, 1500);
      console.log(eventloop.callStack, eventloop.webApi);
    } else if (eventloop.callStack.length >= numOfCallbacks) {
      clearInterval(intervalId);
    }
  }, 3000);
}

function viewCallStack(currentCall) {
  const callStackBox = document.querySelector(".call-stack");
  const currentCallHtml = `<div>${currentCall.funcType}</div>`;
  callStackBox.innerHTML = currentCallHtml;
}

function viewWebAPIs(currentCall) {
  const webApiBox = document.querySelector(".web-api-box");
  const divEl = document.createElement("div");
  divEl.innerText = currentCall.callback;
  webApiBox.appendChild(divEl);
}
