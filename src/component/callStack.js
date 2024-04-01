import { Box } from "./animationHelper/boxModal.js"
import { AnimationGenerator } from "./animationHelper/animationGenerator.js"
import wepApikManager from "./webApi.js"
function CallStackManager() {
    
    const callStack = []

    const pushToCallStack = (curExecutionContext) => {
        callStack.push(curExecutionContext)
        createCallStackHTML(curExecutionContext)
        spliceCallBack(curExecutionContext)
    }

    const isCallBack = (curExecutionContext) => {
        if (curExecutionContext.code.includes("fetch")) {
            callStack.pop()
            return false;
        }
        return true;
    }

    const spliceCallBack = (curExecutionContext) => {
        if(!isCallBack(curExecutionContext)) return;
        const asynchronousFunc = callStack.pop()
        wepApikManager.pushToWepApi(asynchronousFunc);
    }

    const createCallStackHTML = async(contex) => {
        const uniqueId = Date.now()
        const box = new Box(contex.code, uniqueId)
        const animationGenerator = new AnimationGenerator(uniqueId, "call-stack-container")
        renderFunc(box.creatBox())
        return await animationGenerator.applyCallBackInAnimation()
    }

    const renderFunc = (node) => {
        const bodyEl = document.querySelector(".engine-container")
        bodyEl.append(node)
    }

    const isCallStackEmpty = () => !callStack.length;

    return {pushToCallStack, isCallStackEmpty}
}

const callStackManager = CallStackManager()
export default callStackManager
