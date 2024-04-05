import { ANIMATION } from '../utils/Constants.js';
import Elements from './Elements.js';
import Memory from './Memory.js';

class TaskQueue extends Memory {
	constructor(code) {
		super(code, 'goto-task-queue', 'taskQueue');
	}
	async push() {
		await super.push(Elements.$taskQueue);
	}
	pop() {
		const box = document.querySelector('.macrotask-queue .code-box');
		if (!box) return;
		box && box.classList.remove('goto-task-queue');
		box && box.classList.add('from-task-queue-goto-call-stack');
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove('from-task-queue-goto-call-stack');
				resolve(box);
				box.remove();
			}, ANIMATION.delay)
		);
	}
}

export default TaskQueue;
