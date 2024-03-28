import { astParser } from "./utill/astParser.js";
import { eventLoop } from "./component/evevtLoop.js";
function ExecutionContextManager() {
    const executionContextList = [];
    
    const main = (inputCode) => {
        executionContextList.push(...astParser.splitCodeByFunctions(inputCode))
        eventLoop()
    };

    const getMainFunction = () => executionContextList.shift()

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
    return { setEventHandler, getMainFunction };
}

const executionContextManager = ExecutionContextManager();
executionContextManager.setEventHandler()
export default executionContextManager.getMainFunction