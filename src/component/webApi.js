import { Box, renderFunc } from "./animationHelper/boxModal.js";
import { AnimationGenerator } from "./animationHelper/animationGenerator.js";
import queueManager from "./queue.js";

const WebAPIkManager = {
    async pushToWepApi(asynchronousFunc) {
        const id = await this.createWepApiHTML(asynchronousFunc);
        queueManager.pushToQeuue(id, asynchronousFunc);
    },

    async createWepApiHTML(contex) {
        const uniqueId = Date.now();

        const box = new Box(contex.callBack, uniqueId);
        renderFunc(box.createBox());

        const animationGenerator = new AnimationGenerator(uniqueId, "wep-Api-container");
        await animationGenerator.delay(2000);
        animationGenerator.applyWepApiInAnimation();

        return uniqueId;
    },
};


export default WebAPIkManager;
