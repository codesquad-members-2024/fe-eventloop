import { FIRST_IDX } from "../util/constants.js";

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

const createAnimationDivMarkup = (callBack, className) => {
    // const animationClassName = 
    const newHTML = `<div class="animation__stuff ${animationMap[className]}">${callBack.callBackCode}</div>`;
    return newHTML;
};

const appendTag = async(callBack, className, memory) => {
    const TargetAppend = document.querySelector(className);
    const animationDivHtml = createAnimationDivMarkup(callBack, className);
    TargetAppend.insertAdjacentHTML("beforeend", animationDivHtml); 
    memory.updateStatusByClassName(callBack, className, "push");
};

export {removeMatchingElement, createAnimationDivMarkup, appendTag}