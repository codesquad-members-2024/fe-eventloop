import { Box, renderFunc } from "../view/animationHelper/boxModal.js";
import { AnimationGenerator } from "../view/animationHelper/animationGenerator.js";
import queueManager from "./queue.js";

const WebAPIkManager = {
    async pushToWebApi(asynchronousFunc) {
        const id = await this.createWebAPIHTML(asynchronousFunc);
        queueManager.pushToQeuue(id, asynchronousFunc);
    },

    async createWebAPIHTML(context) {
        const uniqueId = Date.now();

        const box = new Box(context.callBack, uniqueId);
        renderFunc(box.createBox());

        const animationGenerator = new AnimationGenerator(uniqueId, "web-Api-container");
        await animationGenerator.delay(2000);
        animationGenerator.applyWebApiInAnimation();

        return uniqueId;
    },
};

export default WebAPIkManager;
