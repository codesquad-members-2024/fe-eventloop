import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";
import Memory from "./Memory.js";

class TaskQueue extends Memory {
	constructor(code) {
		super(code, "goto-task-queue");
	}

	async push() {
		await super.push(Elements.$taskQueue);
	}

	pop() {
		const box = document.querySelector(".macrotask-queue .code-box");
		box.classList.remove("goto-task-queue");
		box.classList.add("from-task-queue-goto-call-stack");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove("from-task-queue-goto-call-stack");
				resolve(box);
				box.remove();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "taskQueue";
	}
}

export default TaskQueue;
