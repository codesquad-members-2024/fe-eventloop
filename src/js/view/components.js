import { FIRST_IDX, delay } from "../util/constants.js";
import { selectorsMap } from "../util/constants.js";

const removeMatchingElement = (callBack, className, memory) => {
    const callStackTarget = document.querySelector(className);
    const stuff = Array.from(callStackTarget.children).filter(curStuff => curStuff.textContent === callBack.callBackCode);
    stuff[FIRST_IDX].remove();
    memory.updateStatusByClassName(callBack, className, "pop");
};

const animationMap = {
    ".animation__call_stack_box": "callStack",
    ".animation__web_api_box": "webAPI",
    ".animation__micro_task_box": "micro",
    ".animation__macro_task_box": "macro",
}

const createAnimationDivMarkup = (callBack, className, fromQueue) => {
    const animationLocation = !fromQueue ? animationMap[className] : "eventLoop"
    const newHTML = `<div class="animation__stuff ${animationLocation}">${callBack.callBackCode}</div>`;
    return newHTML;
};

const appendTag = async(callBack, className, memory, fromQueue) => {
    const TargetAppend = document.querySelector(className);
    const animationDivHtml = createAnimationDivMarkup(callBack, className, fromQueue);
    TargetAppend.insertAdjacentHTML("beforeend", animationDivHtml); 
    memory.updateStatusByClassName(callBack, className, "push");
};

const runLoop = async() => {
    const loopNode = document.querySelector(".animation__event_loop_icon")
    loopNode.classList.add("spinAnimation")
    await delay(1000)
    loopNode.classList.remove("spinAnimation")

}

export const addQueueAnimation = async(className) => {
    const queueBoxes = [...document.querySelector(className).children]
    const queueName = className === ".animation__micro_task_box" ? "micro" : "macro";
    queueBoxes.forEach(curBox => curBox.classList.add("queue-move"))
    await runLoop()
    queueBoxes.forEach(curBox => curBox.classList.remove("queue-move", queueName))
}

export {removeMatchingElement, createAnimationDivMarkup, appendTag}