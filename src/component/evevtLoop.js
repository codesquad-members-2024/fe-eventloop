import getMainFunction from "../main.js";
import callStackManager from "./callStack.js";
export async function eventLoop() {
    const main = () => {
        if(callStackManager.isCallStackEmpty()) {
            callStackManager.pushToCallStack(getMainFunction())
        } else {
            return;
        }
    }

    main()
}