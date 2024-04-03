import Task from "./Task.js";
import delay from "../utils/delay.js";
import { MICRO_TASK, MACRO_TASK, TASK_DELAY } from "../utils/constans.js";
import startAnimation from "../utils/animation.js";

function createTasks() {
	const keys = ["callStack", "webAPIs", "microQueue", "macroQueue"];
	const classNames = ["call-stack-area", "web-apis-area", "micro-queue", "macro-queue"];

	return keys.reduce((prev, curr, i) => {
		prev[curr] = new Task(classNames[i]);
		return prev;
	}, {});
}

async function runOneCycle(taskMap, task, stopState) {
	// await delay(TASK_DELAY);
	taskMap.callStack.appendTask(task, startAnimation);
	if (task === "fetch" || stopState.stop) return;

	await delay(TASK_DELAY);
	taskMap.webAPIs.appendTask(`${task} cb`, startAnimation);
	if (task === "catch" || stopState.stop) return;

	await delay(TASK_DELAY);
	if (MICRO_TASK.includes(task)) taskMap.microQueue.appendTask(`${task} cb`, startAnimation);
	if (MACRO_TASK.includes(task)) taskMap.macroQueue.appendTask(`${task} cb`, startAnimation);
	if (stopState.stop) return;

	await delay(TASK_DELAY);
	taskMap.callStack.appendTask(`${task} cb`, startAnimation);
}

async function moveTasks(tasks, stopState) {
	const taskMap = createTasks();
	for (const task of tasks) {
		if (stopState.stop) return;
		await runOneCycle(taskMap, task, stopState);
	}
}

export default moveTasks;
