import executionContextManager from "../main.js";
import callStackManager from "./callStack.js";
import queueManager from "./queue.js";
import { AnimationGenerator } from "./animationHelper/animationGenerator.js";

export async function eventLoop() {
    const main = () => {
        if (callStackManager.isCallStackEmpty()) return callStackManager.pushToCallStack(executionContextManager.getMainFunction());
    };

    const test = async() => {
        if (!queueManager.isQueueEmpty()) {
            const curQueue = queueManager.getQueue()
            const animationGenerator = new AnimationGenerator(curQueue.id, "call-stack-container")
            await animationGenerator.delay(8000)
            animationGenerator.applyQueueoutAnimation(curQueue.position)
        }
    }

    main();
    
    const executionContexLoop = setInterval(() => {
        main();
        if (executionContextManager.isFunc()) clearInterval(executionContexLoop);
    }, 3000);

    setInterval(() => {
        test();
    }, 3000);
}
