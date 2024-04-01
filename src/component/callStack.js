import { Box, renderFunc } from "./animationHelper/boxModal.js";
import { AnimationGenerator } from "./animationHelper/animationGenerator.js";
import WebAPIkManager from "./webApi.js";

const CallStackManager = {
    callStack: [],

    pushToCallStack(curExecutionContext) {
        this.callStack.push(curExecutionContext);
        this.createCallStackHTML(curExecutionContext);
        this.spliceCallBack(curExecutionContext);
    },

    isCallBack(curExecutionContext) {
        if (curExecutionContext.code.includes("fetch")) {
            this.callStack.pop();
            return false;
        }
        return true;
    },

    spliceCallBack(curExecutionContext) {
        const isCallBack = !this.isCallBack(curExecutionContext);
        if (isCallBack) return;
        const asynchronousFunc = this.callStack.pop();
        WebAPIkManager.pushToWepApi(asynchronousFunc);
    },

    async createCallStackHTML(contex) {
        const uniqueId = Date.now();
        const box = new Box(contex.code, uniqueId);
        const animationGenerator = new AnimationGenerator(
            uniqueId,
            "call-stack-container"
        );
        renderFunc(box.creatBox());
        return await animationGenerator.applyCallBackInAnimation();
    },

    isCallStackEmpty() { // 키값으로 인식
        return !this.callStack.length;
    },
};

export default CallStackManager;
