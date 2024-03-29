import { astParser } from "./utill/astParser.js";
import { eventLoop } from "./component/evevtLoop.js";
function ExecutionContextManager() {
    const executionContextList = [];
    
    const main = (inputCode) => {
        const functionList = [...astParser.splitCodeByFunctions(inputCode)];
        functionList.forEach(curFunc => {
            const node = acorn.parse(curFunc, { ecmaVersion: "latest" });
            if(curFunc.includes("fetch")) executionContextList.push(astParser.splitFetchCallBack(node, curFunc))
            if(curFunc.includes("then")) executionContextList.push(...astParser.splitMicroCallBack(node, curFunc))
            if(curFunc.includes("setTimeout")) executionContextList.push(...astParser.splitMacroCallBack(node, curFunc))
        })
        eventLoop()
    };

    const getMainFunction = () => executionContextList.shift()
    const isFunc = () => !executionContextList.length
    const getInputValue = () => {
        const inputValue = document.querySelector(".code-input");
        main(inputValue.value);
        inputValue.value = null;
    };

    const setEventHandler = () => {
        const runBtn = document.querySelector(".run-btn");
        runBtn.removeEventListener("click", getInputValue);
        runBtn.addEventListener("click", getInputValue);
    };
    return { setEventHandler, getMainFunction, isFunc };
}

const executionContextManager = ExecutionContextManager();
executionContextManager.setEventHandler()
export default executionContextManager