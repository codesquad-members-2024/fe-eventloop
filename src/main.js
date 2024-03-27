import { CallStack } from "./component/callStack.js";
function EventLoop() {
    const main = (inputCode) => {
        const callStack = new CallStack(inputCode)
        callStack.appendCode()
    };

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
    return { setEventHandler };
}

const eventLoop = EventLoop();
eventLoop.setEventHandler()
