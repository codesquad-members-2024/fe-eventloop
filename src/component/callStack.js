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
        const isNotCallBack = !this.isCallBack(curExecutionContext);
        if (isNotCallBack) return;
        const asynchronousFunc = this.callStack.pop();
        WebAPIkManager.pushToWepApi(asynchronousFunc);
    },

    async createCallStackHTML(context){
        const uniqueId = Date.now(); 

        const box = new Box(context.code, uniqueId);
        renderFunc(box.createBox());

        return await this.initializeAnimation(uniqueId);
    },

    isCallStackEmpty() { 
        return !this.callStack.length;
    },

    async initializeAnimation(uniqueId) {
        const animationGenerator = new AnimationGenerator(uniqueId, "call-stack-container");
        return await animationGenerator.applyCallBackAnimation();
    }
};

export default CallStackManager;
