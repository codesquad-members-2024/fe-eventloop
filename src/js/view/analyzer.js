import Parser from "../components/Parser.js";
import CallStack from "../components/CallStack.js";
import WebAPI from "../components/WebAPI.js";
import MicroQueue from "../components/MicroQueue.js";
import TaskQueue from "../components/TaskQueue.js";
import excuteEventLoop from "../components/EventLoop.js";
import { PARSER } from "../utils/Constants.js";

const memories = {
	callstack: [],
	microQueue: [],
	taskQueue: [],
	webApi: [],
	async push(memory) {
		memories[memory.toString()].push(memory);
		await memory.push();
	},
	async pop(memory) {
		const block = await memory.pop();
		memories[memory.toString()].pop();
		return block;
	},
	callStackPush(block) {
		const callstack = new CallStack();
		memories.callstack.push(callstack);
		callstack.eventloopPush(block);
	},
};

async function webAPI(api, callstack, codeLines, i) {
	if (api === PARSER.FETCH || api === PARSER.CATCH) {
		await memories.pop(callstack);
		return;
	}

	const callback = Parser.matchCallbackFn(codeLines[i]);
	const webApi = new WebAPI(callback);
	await memories.push(webApi);
	await memories.pop(callstack);

	if (webApi.isPromise(api)) {
		//promise면 micro로
		await memories.pop(webApi);
		const micro = new MicroQueue(callback);
		await memories.push(micro);
	}
}

function replaceWebAPIWord(line) {
	let codeLine = line;
	const api = Parser.isWebAPI(codeLine);
	if (api) codeLine = `${api}();`;
	return { codeLine, api };
}

async function excuteWebAPILeft(i, length) {
	const isOverCode = i === length;
	const isNotEmptyWebAPI = memories.webApi.length;

	if (isOverCode && isNotEmptyWebAPI)
		for (const memory of memories.webApi) {
			const block = await memories.pop(memory);
			const taskQueue = new TaskQueue(block);
			await memories.push(taskQueue);
		}
}

async function excuteCallStackLeft() {
	const isNotEmptyCallStack = memories.callstack.length;
	if (isNotEmptyCallStack)
		for (const memory of memories.callstack) {
			await memories.pop(memory);
		}
}

async function analyze(code) {
	const codeLines = Parser.getLines(code);

	for (let i = 0; i <= codeLines.length; i++) {
		const { codeLine, api } = replaceWebAPIWord(codeLines[i]);
		const callstack = new CallStack(codeLine);
		if (i < codeLines.length) await memories.push(callstack);

		if (api) await webAPI(api, callstack, codeLines, i);

		await excuteWebAPILeft(i, codeLines.length);
		await excuteEventLoop(memories);
		await excuteCallStackLeft();
	}
}

export { analyze };
