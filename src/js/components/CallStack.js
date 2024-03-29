import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";
import Memory from "./Memory.js";

class CallStack extends Memory {
	constructor(code) {
		super(code, "push");
	}

	async push() {
		await super.push(Elements.$callStack);
	}

	pop() {
		const block = document.querySelector(".call-stack .code-box");
		block.classList.remove("push", "event-loop-push");
		block.classList.add("pop");
		return new Promise((resolve) =>
			setTimeout(() => {
				block.remove();
				resolve();
			}, ANIMATION.delay)
		);
	}

	eventloopPush(box) {
		Elements.$callStack.appendChild(box);
		const callstackBox = document.querySelector(".call-stack .code-box");
		callstackBox.classList.add("event-loop-push");
	}

	toString() {
		return "callstack";
	}
}

export default CallStack;
