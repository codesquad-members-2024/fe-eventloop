import { CallStack, WebAPI } from './taskModel.js';
import { CallStackObserver, WebAPIObserver } from './observer.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

function executeTasksSequentially(tasks) {
  let promise = Promise.resolve();

  tasks.forEach((task) => {
    promise = promise.then(() => {
      callStack.addTask(task.functionName || task.type);
      return new Promise((resolve) => {
        setTimeout(() => {
          callStack.removeTask();
          resolve();
        }, 3000);
      });
    });
  });

  return promise;
}

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
    await callStack.addTask(task.functionName || task.type);
    await delay(1000);
  }
}

async function registerCallbackToWebAPI(tasks) {
  for (const task of tasks) {
    await webAPI.addTask(task);
  }
}
processTasks(tasks);
registerCallbackToWebAPI(tasks);
// registerCallbackToWebAPI();
// executeTasksSequentially(tasks).then(() => {
//   console.log('모든 작업이 완료되었습니다.');
// });
