import { selectorsMap } from "../contants.js";
import { extractCallbackCode } from "../model/acornParser.js";

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
    console.log(nodeList.flat())
    // new EventLoopHandler(callBacks, animationContainerClassNames);
};
