// const astParser = new AstParser(inputCode);
// const callBackAndDelay = astParser.extractCallbackAndDelay(ast);
// const ast = acorn.parse(inputValue, { ecmaVersion: "latest" });
import { CallStack } from "./component/callStack.js";
function EventLoop() {
    const main = (inputCode) => {
        const callStack = new CallStack(inputCode)
        callStack.appendCode()
    };
    
    const getInputValue = () => {
        const inputValue = document.querySelector(".code-input").value;
        main(inputValue);
    };

    const setEventHandler = () => {
        const runBtn = document.querySelector(".run-btn");
        runBtn.addEventListener("click", getInputValue);
    };
    return { setEventHandler };
}

const eventLoop = EventLoop();
eventLoop.setEventHandler()
