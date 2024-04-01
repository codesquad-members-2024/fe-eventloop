const eventloop = {
  callStack: [],
  webApi: [],
  macroQueue: [],
  microQueue: [],
};
const ANIMATION_DURATION = 3000;
const NEXT_ANIMATION_DELAY = 1500;

let callStackBox;
let webApiBox;

export function controllEventLoop(callbacks) {
  callStackBox = document.querySelector(".call-stack");
  webApiBox = document.querySelector(".web-api-box");
  initializeEventloop();
  moveCallstackToWebApi(callbacks);
}

function initializeEventloop() {
  Object.values(eventloop).forEach((box) => box.length = 0);
  callStackBox.innerHTML = "";
  webApiBox.innerHTML = "";
}

function moveCallstackToWebApi(callbacks) {
  const callbackCount = callbacks.length;

  const intervalId = setInterval(() => {
    if (eventloop.callStack.length === callbackCount) {
      clearInterval(intervalId);
      return;
    }

    const currentCall = callbacks.shift();
    eventloop.callStack.push(currentCall);
    viewCallStack(currentCall);
    setTimeout(() => {
      eventloop.webApi.push(currentCall);
      viewWebAPIs(currentCall);
    }, NEXT_ANIMATION_DELAY);
  }, ANIMATION_DURATION);
}

function viewCallStack(currentCall) {
  callStackBox.innerHTML = `<div>${currentCall.funcType}</div>`;
}

function viewWebAPIs(currentCall) {
  webApiBox.innerHTML += `<div>${currentCall.callback}</div>`;
}
