import { selectorsMap } from "../util/constants.js";
import { extractCallbackCode } from "../model/acornParser.js";
import EventLoopHandler from "../prevCode/prevEventLoopHandler.js";

const classNames = {
    callStackClassName: ".animation__call_stack_box",
    webApiClassName: ".animation__web_api_box",
    microQClassName: ".animation__micro_task_box",
    macroQClassName: ".animation__macro_task_box",
};

const createParseCode = () => {
    const userCode = document.getElementById(selectorsMap.textId).value;
    const parseCode = acorn.parse(userCode, { sourceType: "module" });
    return [parseCode, userCode];
};

export const addEventHandler = () => {
    document.getElementById(selectorsMap.formId).addEventListener("submit", handleFormSubmit);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const [parseCode, userCode] = createParseCode();
    const nodeList = parseCode.body.map((obj) => extractCallbackCode(obj, userCode));
    new EventLoopHandler(nodeList.flat(), classNames);
};

export {createParseCode, handleFormSubmit}