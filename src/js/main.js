import { CallStack, WebAPI } from './taskModel.js';
import { CallStackObserver, WebAPIObserver } from './observer.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

const tasks = parseCode(code);
console.log(tasks);

const callStack = new CallStack();
const callStackObserver = new CallStackObserver('callStack');
const webAPI = new WebAPI();
const webAPIObserver = new WebAPIObserver('webAPIs');
callStack.addObserver(callStackObserver);
webAPI.addObserver(webAPIObserver);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processTasks(tasks) {
  for (const task of tasks) {
    callStack.addTask(task.functionName || task.type);
    webAPI.addTask(task);
    await delay(2000);
  }
  callStack.resetTask();
}

async function main() {
  await processTasks(tasks);
  console.log('큐!');
}

main();
