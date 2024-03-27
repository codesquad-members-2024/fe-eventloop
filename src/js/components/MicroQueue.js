import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class MicroQueue {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-micro">${code}</span>`;
	}

	push() {
		Elements.$micro.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".microtask-queue .code-box");
		box.classList.remove("goto-micro");
		box.classList.add("goto-call-stack");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.remove();
				resolve();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "microQueue";
	}
}

export default MicroQueue;
