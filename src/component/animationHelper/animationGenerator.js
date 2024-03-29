import locationCalculater from "./locationCalculator.js";
export class AnimationGenerator{
    constructor(id, drawPosition) {
        this.id = id
        this.drawPosition = drawPosition
    }

    delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async applyCallBackInAnimation() {
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
        await animation.finished;
        await this.delay(1000)
        this.applyCallBackIOutAnimation()
    }

    applyCallBackIOutAnimation() {
        const Location = locationCalculater.getLocation(this.drawPosition);
        const element = document.getElementById(`${this.id}`);
        const animation = element.animate(
            [
                {
                    transform: `translate(${Location.x}px, 0px)`,
                    opacity: 0,
                }
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                direction: "normal",
                fill: "forwards",
            }
        );
    }
}