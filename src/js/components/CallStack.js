import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class CallStack {
	// TODO 각 class -> prototype / 겹치는거 많음 상속으로 변경
	#block;

	constructor(code) {
		this.#block = `<span class="code-box push">${code}</span>`;
	}

	push() {
		Elements.$callStack.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".call-stack .code-box");
		box.classList.remove("push");
		box.classList.add("pop");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.remove();
				resolve();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "callstack";
	}
}

export default CallStack;
