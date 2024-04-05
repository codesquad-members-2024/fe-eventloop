import executionContextManager from "./executionContextManager.js";
import CallStackManager from "./callStack.js";
import queueManager from "./queue.js";
import { AnimationGenerator } from "./animationHelper/animationGenerator.js";

let executionContextInterval;
let queueInterval;

const moveToCallStackFromQueue = async () => {
    const image = document.querySelector(".event-loop-view img");
    if (!queueManager.isQueueEmpty()) {
        const curQueue = queueManager.getQueue();
        const animationGenerator = new AnimationGenerator(curQueue.id, "call-stack-container");
        await animationGenerator.delay(8000);
        animationGenerator.applyQueueoutAnimation(curQueue.position);
        image.classList.add("active");
    } else {
        image.classList.remove("active");
    }
};

const moveToCallbackFromMain = () => {
    if (CallStackManager.isCallStackEmpty())
        return CallStackManager.pushToCallStack(
            executionContextManager.getMainFunction()
        );
};

export async function eventLoop() {
    moveToCallbackFromMain();

    executionContextInterval = setInterval(() => {
        moveToCallbackFromMain();
        if (executionContextManager.isFunc())
            clearInterval(executionContextInterval);
    }, 3000);

    queueInterval = setInterval(() => {
        moveToCallStackFromQueue();
    }, 3000);
}
