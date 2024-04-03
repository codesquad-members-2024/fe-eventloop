import LocationCalculator from "./locationCalculator.js";

export class AnimationGenerator {
    constructor(id, drawPosition) {
        this.id = id;
        this.drawPosition = drawPosition;
    }

    delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async applyCallBackAnimation(isInAnimation = true) {
        const Location = LocationCalculator.getLocation(this.drawPosition);
        const element = document.getElementById(`${this.id}`);
        let animations = [];

        animations.push({
            transform: `translate(${Location.x}px, 0px)`,
            opacity: 0,
        });
        if (isInAnimation) {
            animations.push({
                transform: `translate(${Location.x}px, ${Location.y}px)`,
                opacity: isInAnimation ? 1 : 0,
            });
        }

        const animation = element.animate(animations, {
            duration: 2000,
            easing: "ease-in-out",
            direction: "normal",
            fill: "forwards",
        });

        await animation.finished;

        if (!isInAnimation) {
            element.remove();
        } else {
            await this.delay(1000);
            this.applyCallBackAnimation(false);
        }

        return Location;
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
        const prevLocation = LocationCalculator.getLocation("call-stack-container");
        const newLocation = LocationCalculator.getLocation(this.drawPosition);
        this.animateElement(this.id, prevLocation, newLocation);
    }

    applyQueueInAnimation() {
        const prevLocation = LocationCalculator.getLocation("wep-Api-container");
        const newLocation = LocationCalculator.getQueueLocation(this.drawPosition);
        this.animateElement(this.id, prevLocation, newLocation);
    }

    async applyQueueoutAnimation(queueContainer) {
        const prevLocation = LocationCalculator.getQueueLocation(queueContainer);
        const newLocation = LocationCalculator.getLocation(this.drawPosition);
        const animation = this.animateElement(this.id, prevLocation, newLocation);
        await animation.finished;
        await this.delay(1000);
        this.applyCallBackAnimation(false); // out animation
    }

    setDrawPosition(drawPosition) {
        this.drawPosition = drawPosition;
    }
}
