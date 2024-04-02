import Task from "../components/Task.js";
import delay from "../components/delay.js";
import { MICRO_TASK, MACRO_TASK, TASK_DELAY } from "../utils/constans.js";

function createTasks() {
	const keys = ["callStack", "webAPIs", "microQueue", "macroQueue"];
	const classNames = ["call-stack-area", "web-apis-area", "micro-queue", "macro-queue"];

	return keys.reduce((prev, curr, i) => {
		prev[curr] = new Task(classNames[i]);
		return prev;
	}, {});
}

async function moveTasks(tasks) {
	const Task = createTasks();

	for (const task of tasks) {
		await delay(TASK_DELAY);
		Task.callStack.appendTask(task);

		await delay(TASK_DELAY);
		Task.webAPIs.appendTask(task + " cb");

		await delay(TASK_DELAY);
		if (MICRO_TASK.includes(task)) {
			Task.microQueue.appendTask(task + " cb");
		} else if (MACRO_TASK.includes(task)) {
			Task.macroQueue.appendTask(task + " cb");
		}

		await delay(TASK_DELAY);
		Task.callStack.appendTask(task + " cb");
	}
}

export default moveTasks;
