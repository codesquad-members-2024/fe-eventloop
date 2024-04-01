import { Box } from "./animationHelper/boxModal.js"
import { AnimationGenerator } from "./animationHelper/animationGenerator.js"
import queueManager from "./queue.js"
function WepApikManager() {

    const pushToWepApi = async(asynchronousFunc) => {
        const id = await createWepApiHTML(asynchronousFunc)
        queueManager.pushToQeuue(id, asynchronousFunc)
    }

    const createWepApiHTML = async(contex) => {
        const uniqueId = Date.now()
        const box = new Box(contex.callBack, uniqueId)
        const animationGenerator = new AnimationGenerator(uniqueId, "wep-Api-container")
        renderFunc(box.creatBox())
        await animationGenerator.delay(2000)
        animationGenerator.applyWepApiInAnimation()
        return uniqueId
    }
    
    const renderFunc = (node) => {
        const bodyEl = document.querySelector(".engine-container")
        bodyEl.append(node)
    }

    return {pushToWepApi}
}

const wepApikManager = WepApikManager()
export default wepApikManager
