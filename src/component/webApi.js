import { Box } from "../utill/boxModel.js";
import { delay } from "../utill/astParser.js";
import locationCalculater from "../utill/locationCalculator.js";
import { AstParser } from "../utill/astParser.js";
export class WebApi {
    constructor(callBackAndDelay) {
        this.callBack = callBackAndDelay.callBack;
        this.delay = callBackAndDelay.delay;
    }

    appendCode(callStackLocation) {
        const box = new Box();
        const [callBackBoxModel, className] = box.creatCallBackBox(this.callBack, this.delay);
        console.log(callBackBoxModel)
        const enginContainer = document.querySelector(".engin-container");
        enginContainer.appendChild(callBackBoxModel);
        this.wepApiInAnimation(className, callStackLocation);
    }

    wepApiInAnimation(className, callStackLocation) {
        const [callBackX, callBackY] = [callStackLocation.x, callStackLocation.y]
        const wepApiLocation = locationCalculater.getWepApiLocation();
        const callBackElement = document.querySelector(`.${className}`);
        const animation = callBackElement.animate(
            [
                {
                    transform: `translate(${callBackX}px, ${callBackY}px)`,
                    opacity: 0.3,
                },
                {
                    transform: `translate(${wepApiLocation.x}px, ${wepApiLocation.y}px)`,
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
            // locationCalculater.resetLocation("callStack");
            // this.callStackOutAnimation(className);
            // this.spliteCallback(this.callBack);
        };
    }

    // async callStackOutAnimation(className) {
    //     await delay(1000);
    //     const callStackLocation = locationCalculater.getCallStackLocation();
    //     const element = document.querySelector(`.${className}`);
    //     const animation = element.animate(
    //         [
    //             {
    //                 transform: `translate(${callStackLocation.x}px, ${callStackLocation.y}px)`,
    //                 opacity: 1,
    //             },
    //             {
    //                 transform: `translate(${callStackLocation.x}px, 0px)`,
    //                 opacity: 0,
    //             },
    //         ],
    //         {
    //             duration: 2000,
    //             easing: "ease-in-out",
    //             direction: "normal",
    //             fill: "forwards",
    //         }
    //     );
    //     animation.onfinish = () => {
    //         locationCalculater.resetLocation("callStack");
    //         element.remove()
    //     };
    // }

    // spliteCallback(callBack) {
    //     const ast = acorn.parse(callBack, { ecmaVersion: "latest" });
    //     const astParser = new AstParser(callBack);
    //     const callBackAndDelay = astParser.extractCallbackAndDelay(ast);
    // }
}

