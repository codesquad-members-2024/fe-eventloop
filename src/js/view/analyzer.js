import Parser from '../components/Parser.js';
import CallStack from '../components/CallStack.js';
import WebAPI from '../components/WebAPI.js';
import MicroQueue from '../components/MicroQueue.js';
import TaskQueue from '../components/TaskQueue.js';
import excuteEventLoop from '../components/EventLoop.js';
import { PARSER } from '../utils/Constants.js';

const memories = {
	callstack: [],
	microQueue: [],
	taskQueue: [],
	webApi: [],
	/**
	 * @param {Memory|CallStack|WebAPI|MicroQueue|TaskQueue} memory - 메모리 객체
	 */
	async push(memory) {
		memories[memory.targetQueue].push(memory);
		await memory.push();
	},
	async pop(memory) {
		const elementHTML = await memory.pop();
		memories[memory.targetQueue].pop();
		return elementHTML;
	},
	callStackPush(elementHTML) {
		const callstack = new CallStack();
		memories.callstack.push(callstack);
		callstack.eventloopPush(elementHTML);
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

function replaceWebAPIWord(codeLine) {
	const api = Parser.isWebAPI(codeLine);
	if (api) codeLine = `${api}();`;
	return { codeLine, api };
}

async function excuteWebAPILeft(i, length) {
	const isOverCode = i === length; //반복문 종료 목적
	const isNotEmptyWebAPI = memories.webApi.length; //webAPI가 남아있는지

	if (isOverCode && isNotEmptyWebAPI)
		//반복문 종료 && webAPI가 남아있는 경우
		for (const memory of memories.webApi) {
			//webAPI 객체를 하나씩 꺼내서 실행
			const block = await memories.pop(memory);
			const taskQueue = new TaskQueue(block);
			await memories.push(taskQueue);
		}
}
//callstack에 남아있는 것들을 실행, callstack이 비어있을 때까지 반복 (callstack비어있지 않을떄)
async function excuteCallStackLeft() {
	const isNotEmptyCallStack = memories.callstack.length;
	if (isNotEmptyCallStack)
		for (const memory of memories.callstack) {
			await memories.pop(memory);
		}
}

async function analyze(code, state) {
	state = true;
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
