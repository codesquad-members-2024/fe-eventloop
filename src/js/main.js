import { CallStack } from './taskModel.js';
import { CallStackObserver } from './observer.js';
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
callStack.addObserver(callStackObserver);

tasks.forEach((task) => {
  callStack.addTask(task.functionName || task.type);
});
executeTasksSequentially(tasks).then(() => {
  console.log('모든 작업이 완료되었습니다.');
});
