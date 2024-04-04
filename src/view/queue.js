import { AnimationGenerator } from "./animationHelper/animationGenerator.js";

const QueueManager = {
    queue: {
        microtask: [],
        macrotask: [],
    },

    async pushToQeuue(id, asynchronousFunc) {
        if (asynchronousFunc.type === "then") this.queue.microtask.push(id);
        if (asynchronousFunc.type === "setTimeout")
            this.queue.macrotask.push(id);
        const animationGenerator = new AnimationGenerator(id, asynchronousFunc.type === "then" ? "microtask-container" : "macrotask-container");
        await animationGenerator.delay(2000);
        animationGenerator.applyQueueInAnimation();
    },

    getQueue() {
        if (!this.queue.microtask.length)
            return {id: this.queue.macrotask.shift(), position: "macrotask-container"};
        return {id: this.queue.microtask.shift(), position: "microtask-container"};
    },

    isQueueEmpty() {
        if (!this.queue.microtask.length && !this.queue.macrotask.length)
            return true;
        return false;
    },
};

export default QueueManager;
