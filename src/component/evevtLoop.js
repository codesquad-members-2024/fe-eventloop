import executionContextManager from "../main.js";
import callStackManager from "./callStack.js";
export async function eventLoop() {
    const main = () => {
        if (callStackManager.isCallStackEmpty()) return callStackManager.pushToCallStack(executionContextManager.getMainFunction());
        return;
    };
    main()
    const loop = setInterval(() => {
        main()
        if(executionContextManager.isFunc()) clearInterval(loop)
    }, 3000)
}
