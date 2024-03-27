import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class TaskQueue {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-task-queue">${code}</span>`;
	}

	push() {
		Elements.$taskQueue.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop(isMicroQueue) {}

	toString() {
		return "taskQueue";
	}
}

export default TaskQueue;
