import { FIRST_IDX } from "../util/constants.js";
const removeMatchingElement = (callBack, className, memory) => {
    const callStackTarget = document.querySelector(className);
    const stuff = Array.from(callStackTarget.children).filter(curStuff => curStuff.textContent === callBack.callBackCode);
    stuff[FIRST_IDX].remove();
    memory.updateStatusByClassName(callBack, className, "pop");
};

const createAnimationDivMarkup = (callBack) => {
    const newHTML = `<div class="animation__stuff">${callBack.callBackCode}</div>`;
    return newHTML;
};

const appendTag = async(callBack, className, memory) => {
    const Target2append = document.querySelector(className);
    const animationDivHtml = createAnimationDivMarkup(callBack);
    Target2append.insertAdjacentHTML("beforeend", animationDivHtml); 
    memory.updateStatusByClassName(callBack, className, "push");
};

export {removeMatchingElement, createAnimationDivMarkup, appendTag}