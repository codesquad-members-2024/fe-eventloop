import { ANIMATION } from '../utils/Constants.js';

class Memory {
	elementHTML;
	constructor(code, className, targetQueue) {
		this.elementHTML = `<span class="code-box ${className}">${code}</span>`;
		this.targetQueue = targetQueue;
	}
	stateManager() {}
	push(parentElement) {
		parentElement.innerHTML = this.elementHTML;
		return new Promise((resolve) => {
			setTimeout(() => resolve(), ANIMATION.delay);
		});
	}
}

export default Memory;
