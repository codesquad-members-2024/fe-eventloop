import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";

async function deliveryCallstackFrom(queue, memories) {
	const isEmptyCalltack = !memories.callstack.length;
	const isFullQueue = memories[queue].length;

	if (isEmptyCalltack && isFullQueue) {
		Elements.$eventLoop.classList.add("excute");
		for (const memory of memories[queue]) {
			const block = await memories.pop(memory);
			memories.callStackPush(block);
		}
	}
}

async function excuteEventLoop(memories) {
	deliveryCallstackFrom("microQueue", memories);
	deliveryCallstackFrom("taskQueue", memories);

	return new Promise((resolve) =>
		setTimeout(() => {
			Elements.$eventLoop.classList.remove("excute");
			resolve();
		}, ANIMATION.delay)
	);
}

export default excuteEventLoop;
