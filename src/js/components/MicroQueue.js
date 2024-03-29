import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";
import Memory from "./Memory.js";

class MicroQueue extends Memory {
	constructor(code) {
		super(code, "goto-micro");
	}

	async push() {
		await super.push(Elements.$micro);
	}

	pop() {
		const box = document.querySelector(".microtask-queue .code-box");
		box.classList.remove("goto-micro");
		box.classList.add("from-micro-goto-call-stack");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove("from-micro-goto-call-stack");
				resolve(box);
				box.remove();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "microQueue";
	}
}

export default MicroQueue;
