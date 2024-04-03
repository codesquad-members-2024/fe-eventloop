import { TASK_DELAY } from "../utils/constans.js";

class Task {
	constructor(className) {
		this.className = className;
		this.element = document.querySelector(`.${className}`);
	}

	removeTask() {
		this.element.innerHTML = "";
	}

	appendTask(calleeName) {
		this.element.innerHTML = `<div class="task center">${calleeName}</div>`;
		setTimeout(() => {
			this.removeTask();
		}, TASK_DELAY);
	}
}

export default Task;
