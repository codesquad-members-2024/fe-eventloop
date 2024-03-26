import { CallStack } from "./component/callStack.js";
function EventLoop() {
    const main = (inputCode) => {
        const callStack = new CallStack(inputCode)
        callStack.appendCode()
        
    };

    const getInputValue = (event) => {
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
