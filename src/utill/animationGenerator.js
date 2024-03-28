import locationCalculater from "./locationCalculator.js";
export class AnimationGenerator{
    constructor(id, drawPosition) {
        this.id = id
        this.drawPosition = drawPosition
    }

    applyAnimation() {
        const Location = locationCalculater.getLocation(this.drawPosition);
        const element = document.getElementById(`${this.id}`);
        const animation = element.animate(
            [
                {
                    transform: `translate(${Location.x}px, 0px)`,
                    opacity: 0,
                },
                {
                    transform: `translate(${Location.x}px, ${Location.y}px)`,
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
            // this.spliteCallback(this.excuteCode, callStackLocation);
            // locationCalculater.resetLocation("callStack");
            // this.callStackOutAnimation(className);
        };
    }
}