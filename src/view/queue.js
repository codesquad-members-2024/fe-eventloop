import { AnimationGenerator } from "./animationHelper/animationGenerator.js"

function QueueManager() {
    const queue = {
        microtask: [],
        macrotask: []
    }

    const pushToQeuue = async(id, asynchronousFunc) => {
        if(asynchronousFunc.type === "then") queue.microtask.push(id)
        if(asynchronousFunc.type === "setTimeout") queue.macrotask.push(id)
        const animationGenerator = new AnimationGenerator(id, asynchronousFunc.type === "then" ? "microtask-container": "macrotask-container")
        await animationGenerator.delay(2000)
        animationGenerator.applyQueueInAnimation()
    }

    const getQueue = () => {
        if (!queue.microtask.length) return {id: queue.macrotask.shift(), position: "macrotask-container"}
        return {id: queue.microtask.shift(), position: "microtask-container"}
    }

    const isQueueEmpty = () => {
        if (!queue.microtask.length && !queue.macrotask.length) return true;
        return false
    }

    return {pushToQeuue, getQueue, isQueueEmpty}
}

const queueManager = QueueManager()
export default queueManager