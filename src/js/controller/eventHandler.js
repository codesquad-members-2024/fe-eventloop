import { formId, textId, selectorsMap, delay } from "../util/constants.js";
import { extractCallbackCode } from "../model/acornParser.js";
import { Memory } from "../model/memory.js";
import { removeMatchingElement, appendTag } from "../view/components.js";

const createParseCode = () => {
    const userCode = document.getElementById(textId).value;
    const parseCode = acorn.parse(userCode, { sourceType: "module" });
    return [parseCode, userCode];
};

export const addEventHandler = () => {
    document.getElementById(formId).addEventListener("submit", handleFormSubmit);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const [parseCode, userCode] = createParseCode();
    const nodeList = parseCode.body.map((obj) => extractCallbackCode(obj, userCode)).flat();
    eventLoopControl(nodeList)
};

const checkQueue = (callBack) => {
    if (callBack.type === "setTimeout") return [selectorsMap.macroQClassName, callBack.delay]
    return [selectorsMap.microQClassName, 0]
}

const setTaskQueues = async(callBack, memory) => {
    const [queueName, delayTime] = checkQueue(callBack)
    await delay(delayTime)
    removeMatchingElement(callBack, selectorsMap.webAPIClassName, memory);
    appendTag(callBack, queueName, memory);
}

const processQueueNode = async (queueNode, fromQueue, toQueue, memory) => {
    removeMatchingElement(queueNode, fromQueue, memory);
    appendTag(queueNode, toQueue, memory);
    await delay(2000);
    removeMatchingElement(queueNode, toQueue, memory);
};

const eventLoop = async (memory) => {
    while (!memory.isEmpty(selectorsMap.microQClassName)) {
        const queueNode = memory.getCallBack(selectorsMap.microQClassName);
        await processQueueNode(queueNode, selectorsMap.microQClassName, selectorsMap.callStackClassName, memory);
    }
    const queueNode = memory.getCallBack(selectorsMap.macroQClassName);
    await processQueueNode(queueNode, selectorsMap.macroQClassName, selectorsMap.callStackClassName, memory);
};


const eventLoopControl = async (nodeList) => {
    const memory = new Memory()
    for (const callBack of nodeList) {
        appendTag(callBack, selectorsMap.callStackClassName, memory);
        await delay(2000)
        removeMatchingElement(callBack, selectorsMap.callStackClassName, memory)
        appendTag(callBack, selectorsMap.webAPIClassName, memory);
        await delay(2000)
        setTaskQueues(callBack, memory);
    }
    
    eventLoop(memory);
};

export {createParseCode, handleFormSubmit}