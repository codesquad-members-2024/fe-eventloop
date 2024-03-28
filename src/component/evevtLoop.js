import getMainFunction from "../main.js";
import callStackManager from "./callStack.js";
export function eventLoop() {
    const main = () => {
        if(callStackManager.isCallStackEmpty()) callStackManager.pushToCallStack(getMainFunction())
    }
    // setInterval(() => {
        main()
    // }, 500)
}