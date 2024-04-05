import { ANIMATION } from '../utils/Constants.js';
import Elements from './Elements.js';
import Memory from './Memory.js';

class MicroQueue extends Memory {
	constructor(code) {
		super(code, 'goto-micro', 'microQueue');
	}

	async push() {
		await super.push(Elements.$micro);
	}

	pop() {
		const box = document.querySelector('.microtask-queue .code-box');
		if (!box) return;
		box && box.classList.remove('goto-micro');
		box && box.classList.add('from-micro-goto-call-stack');
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove('from-micro-goto-call-stack');
				resolve(box);
				box.remove();
			}, ANIMATION.delay)
		);
	}
}

export default MicroQueue;
