import { Box } from "../utill/boxModal.js"
import { AnimationGenerator } from "../utill/animationGenerator.js"
function CallStackManager() {
    
    const callStack = []

    const pushToCallStack = (curExecutionContext) => {
        callStack.push(curExecutionContext)
        createCallStackHTML(curExecutionContext)
    }

    const createCallStackHTML = (funcString) => {
        const uniqueId = Date.now()
        const box = new Box(funcString, uniqueId)
        const animationGenerator = new AnimationGenerator(uniqueId, "call-stack-container")
        renderFunc(box.creatBox())
        animationGenerator.applyAnimation()
    }

    const renderFunc = (executionContext) => {
        const bodyEl = document.querySelector(".engine-container")
        bodyEl.append(executionContext)
    }

    const isCallStackEmpty = () => !callStack.length;

    return {pushToCallStack, isCallStackEmpty}
}

const callStackManager = CallStackManager()
export default callStackManager
