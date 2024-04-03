import { TASK_DELAY, EXPLIAN_CODE } from "../utils/constans.js";
import delay from "../utils/delay.js";

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

	async appendTask(calleeName, startAnimation) {
		this.#$excutionBox.innerHTML = `<div class="task center">${calleeName}</div>`;
		this.#$explainBox.innerHTML = EXPLIAN_CODE[calleeName];
		const [$taskBox] = this.#$excutionBox.children;
		startAnimation($taskBox);
		setTimeout(() => {
			this.removeTask();
		}, TASK_DELAY);
		await delay(TASK_DELAY);
	}
}

export default Task;
