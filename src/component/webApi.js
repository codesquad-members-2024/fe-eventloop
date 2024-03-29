import { Box } from "./animationHelper/boxModal.js"
import { AnimationGenerator } from "./animationHelper/animationGenerator.js"
function WepApikManager() {
    const context = []

    const pushToWepApi = (asynchronousFunc) => {
        context.push(asynchronousFunc)
        createWepApiHTML(asynchronousFunc)
    }

    const createWepApiHTML = async(contex) => {
        const uniqueId = Date.now()
        const box = new Box(contex.callBack, uniqueId)
        const animationGenerator = new AnimationGenerator(uniqueId, "wep-Api-container")
        renderFunc(box.creatBox())
        await animationGenerator.delay(2000)
        animationGenerator.applyWepApiInAnimation()
    }
    
    const renderFunc = (node) => {
        const bodyEl = document.querySelector(".engine-container")
        bodyEl.append(node)
    }

    return {pushToWepApi}
}

const wepApikManager = WepApikManager()
export default wepApikManager
