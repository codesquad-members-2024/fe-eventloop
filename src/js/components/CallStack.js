import { ANIMATION } from '../utils/Constants.js';
import Elements from './Elements.js';
import Memory from './Memory.js';

class CallStack extends Memory {
	constructor(code) {
		super(code, 'push', 'callstack');
	}
	async push() {
		await super.push(Elements.$callStack);
	}
	pop() {
		const block = document.querySelector('.call-stack .code-box');
		if (!block) return;
		block && block.classList.remove('push', 'event-loop-push');
		block && block.classList.add('pop');
		return new Promise((resolve) => {
			setTimeout(() => {
				block && block.remove();
				resolve();
			}, ANIMATION.delay);
		});
	}
	eventloopPush(box) {
		if (!box) return;
		box && Elements.$callStack.appendChild(box);
		const callstackBox =
			document.querySelector('.call-stack .code-box') ?? null;
		callstackBox && callstackBox.classList.add('event-loop-push');
	}
}

export default CallStack;
