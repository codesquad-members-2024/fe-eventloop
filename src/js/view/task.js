import { TASK_DELAY, EXPLIAN_CODE } from "../utils/constans.js";

class Task {
	#$excutionBox;
	#$explainBox;

	constructor(className) {
		this.#$excutionBox = document.querySelector(`.${className}`);
		this.#$explainBox = document.querySelector(".explain");
	}

	removeTask() {
		this.#$excutionBox.innerHTML = "";
		this.#$explainBox.innerHTML = "";
	}

	appendTask(calleeName, startAnimation) {
		this.#$excutionBox.innerHTML = `<div class="task center">${calleeName}</div>`;
		this.#$explainBox.innerHTML = EXPLIAN_CODE[calleeName];
		startAnimation(this.#$excutionBox.children[0]);
		setTimeout(() => {
			this.removeTask();
		}, TASK_DELAY);
	}
}

export default Task;
