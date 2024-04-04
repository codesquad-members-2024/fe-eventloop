import { astParser } from "../utils/astParser.js";
import { eventLoop } from "./eventLoop.js";

const ExecutionContextManager = {
    executionContextList: [],

    main(inputCode) {
        const functionList = [...astParser.splitCodeByFunctions(inputCode)];
        functionList.forEach((curFunc) => {
            const node = acorn.parse(curFunc, { ecmaVersion: "latest" });
            if (curFunc.includes("fetch"))
                this.executionContextList.push(
                    astParser.splitFetchCallBack(node, curFunc)
                );
            if (curFunc.includes("then"))
                this.executionContextList.push(
                    ...astParser.splitMicroCallBack(node, curFunc)
                );
            if (curFunc.includes("setTimeout"))
                this.executionContextList.push(
                    ...astParser.splitMacroCallBack(node, curFunc)
                );
        });
        eventLoop();
    },

    getMainFunction() {
        return this.executionContextList.shift();
    },

    isFunc() {
        return !this.executionContextList.length;
    },

    getInputValue() {
        const inputValue = document.querySelector(".code-input");
        ExecutionContextManager.main(inputValue.value);
        inputValue.value = null;
    },

    setEventHandler() {
        const runBtn = document.querySelector(".run-btn");
        runBtn.removeEventListener(
            "click",
            ExecutionContextManager.getInputValue
        );
        runBtn.addEventListener("click", ExecutionContextManager.getInputValue);
    },
};

export default ExecutionContextManager;
