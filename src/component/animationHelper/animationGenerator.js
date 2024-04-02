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
        this.applyCallBackOutAnimation()
        return Location
    }

    async applyCallBackOutAnimation() {
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
        await animation.finished;
        element.remove()
    }

    animateElement(elementId, prevLocation, newLocation) {
        const element = document.getElementById(elementId);
        return element.animate(
            [
                {
                    transform: `translate(${prevLocation.x}px, ${prevLocation.y}px)`,
                },
                {
                    transform: `translate(${newLocation.x}px, ${newLocation.y}px)`,
                },
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                direction: "normal",
                fill: "forwards",
            }
        );
    }
    
    applyWepApiInAnimation() {
        const prevLocation = locationCalculater.getLocation("call-stack-container");
        const newLocation = locationCalculater.getLocation(this.drawPosition);
        this.animateElement(this.id, prevLocation, newLocation);
    }
    
    applyQueueInAnimation() {
        const prevLocation = locationCalculater.getLocation("wep-Api-container");
        const newLocation = locationCalculater.getQueueLocation(this.drawPosition);
        this.animateElement(this.id, prevLocation, newLocation);
    }
    
    async applyQueueoutAnimation(queueContainer) {
        const prevLocation = locationCalculater.getQueueLocation(queueContainer);
        const newLocation = locationCalculater.getLocation(this.drawPosition);
        const animation = this.animateElement(this.id, prevLocation, newLocation);
        await animation.finished;
        await this.delay(1000);
        this.applyCallBackOutAnimation();
    }    

    setDrawPosition(drawPosition) {
        this.drawPosition = drawPosition;
    }
}

