import { Box } from "../utill/boxModel.js";
import { delay } from "../utill/astParser.js";
import locationCalculater from "../utill/locationCalculator.js";
import { AstParser } from "../utill/astParser.js";
export class WebApi {
    constructor(callBackAndDelay) {
        this.callBack = callBackAndDelay.callBack;
        this.delay = callBackAndDelay.delayTime;
    }

    appendCode(callStackLocation) {
        const box = new Box();
        const [callBackBoxModel, className] = box.creatCallBackBox(this.callBack, this.delay);
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
            console.log("애니메이션 끝")
        };
    }
}

