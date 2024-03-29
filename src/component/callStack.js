import { Box } from "./animationHelper/boxModal.js"
import { AnimationGenerator } from "./animationHelper/animationGenerator.js"
import { astParser } from "../utill/astParser.js"
function CallStackManager() {
    
    const callStack = []

    const pushToCallStack = (curExecutionContext) => {
        callStack.push(curExecutionContext)
        createCallStackHTML(curExecutionContext)
        spliceCallBack(curExecutionContext)
    }

    const isCallBack = (curExecutionContext) => {
        if (curExecutionContext.includes("fetch")) {
            callStack.pop()
            return false;
        }
        return true;
    }

    const spliceCallBack = (curExecutionContext) => {
        if(!isCallBack(curExecutionContext)) return;
        const ast = acorn.parse(curExecutionContext, { ecmaVersion: "latest" });
        const callBack = astParser.extractCallback(ast, curExecutionContext)
        console.log(callBack)
    }

    const createCallStackHTML = (contex) => {
        const uniqueId = Date.now()
        const box = new Box(contex.code, uniqueId)
        const animationGenerator = new AnimationGenerator(uniqueId, "call-stack-container")
        renderFunc(box.creatBox())
        animationGenerator.applyCallBackInAnimation()
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
