export function Box(funcString) {
    this.funcString = funcString;
}

Box.prototype.creatBox = function () {
    return [`<div class="call-stack">${this.funcString}</div>`, "call-stack"];
};

Box.prototype.creatCallBackBox = function (callBack, delayTime) {
    console.log(delayTime)
    const callBackEl = document.createElement("div")
    callBackEl.classList.add("call-back-container")
    const callBackViewEl = document.createElement("div")
    callBackViewEl.classList.add("call-back")
    callBackViewEl.innerText = `${callBack}`
    const delayViewEl = document.createElement("div")
    delayViewEl.classList.add("delay-time")
    delayViewEl.innerText = `${delayTime}`
    callBackEl.append(callBackViewEl, delayViewEl)
    return [callBackEl, "call-back-container"];
};
