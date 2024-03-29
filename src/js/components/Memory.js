import { ANIMATION } from "../utils/Constants.js";

class Memory {
	block;

	constructor(code, className) {
		this.block = `<span class="code-box ${className}">${code}</span>`;
	}

	push(element) {
		element.innerHTML = this.block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}
}

export default Memory;
