import { Box } from "../utill/boxModel.js";
import { delay } from "../utill/astParser.js";
import locationCalculater from "../utill/locationCalculator.js";
import { AstParser } from "../utill/astParser.js";
import { WebApi } from "./webApi.js";
export class CallStack {
    constructor(excuteCode) {
        this.excuteCode = excuteCode;
    }

    appendCode() {
        const box = new Box(this.excuteCode);
        const [boxModel, className] = box.creatBox();
        const enginContainer = document.querySelector(".engine-container");
        enginContainer.innerHTML += boxModel;
        this.callStackInAnimation(className);
    }

    callStackInAnimation(className) {
        const callStackLocation = locationCalculater.getCallStackLocation();
        const element = document.querySelector(`.${className}`);
        const animation = element.animate(
            [
                {
                    transform: `translate(${callStackLocation.x}px, 0px)`,
                    opacity: 0,
                },
                {
                    transform: `translate(${callStackLocation.x}px, ${callStackLocation.y}px)`,
                    opacity: 1,
                },
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                direction: "normal",
                fill: "forwards",
            }
        );
        animation.onfinish = () => {
            this.spliteCallback(this.excuteCode, callStackLocation);
            locationCalculater.resetLocation("callStack");
            this.callStackOutAnimation(className);
        };
    }

    async callStackOutAnimation(className) {
        await delay(500);
        const callStackLocation = locationCalculater.getCallStackLocation();
        const element = document.querySelector(`.${className}`);
        const animation = element.animate(
            [
                {
                    transform: `translate(${callStackLocation.x}px, ${callStackLocation.y}px)`,
                    opacity: 1,
                },
                {
                    transform: `translate(${callStackLocation.x}px, 0px)`,
                    opacity: 0,
                },
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                direction: "normal",
                fill: "forwards",
            }
        );
        animation.onfinish = () => {
            locationCalculater.resetLocation("callStack");
            element.remove()
        };
    }

    spliteCallback(excuteCode, callStackLocation) {
        const ast = acorn.parse(excuteCode, { ecmaVersion: "latest" });
        const astParser = new AstParser(excuteCode);
        // 여기서 includes로 micro, macro 확인한다.
        // isType()
        const callBackAndDelay = astParser.extractCallbackAndDelay(ast);
        this.sendToWepapi(callBackAndDelay, callStackLocation)

    }

    sendToWepapi(callBackAndDelay, callStackLocation) {
        const webApi = new WebApi(callBackAndDelay)
        webApi.appendCode(callStackLocation)
    }
}

