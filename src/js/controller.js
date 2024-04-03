import {
  CallStack,
  WebAPI,
  MicroTaskQueue,
  MacroTaskQueue,
  promiseMethods,
  macroTaskApis,
} from './taskModel.js';
import { CallStackObserver, CallbackObserver } from './observer.js';

const callStack = new CallStack();
const webAPI = new WebAPI();
const microTaskQueue = new MicroTaskQueue();
const macroTaskQueue = new MacroTaskQueue();

const callStackObserver = new CallStackObserver('callStack');
const webAPIObserver = new CallbackObserver('webAPIs', 'to-webAPI');
const microQueueObserver = new CallbackObserver('microTaskQueue');
const macroQueueObserver = new CallbackObserver('macroTaskQueue');
callStack.addObserver(callStackObserver);
webAPI.addObserver(webAPIObserver);
microTaskQueue.addObserver(microQueueObserver);
macroTaskQueue.addObserver(macroQueueObserver);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function registerToWebAPI(tasks) {
  for (const task of tasks) {
    callStack.addTask(task.functionName || task.type);
    webAPI.addTask(task);
    await delay(2000);
  }
  callStack.resetTask();
}

export function classifyIntoMacroAndMicro(tasks) {
  const microTask = tasks.filter((task) =>
    promiseMethods.includes(task.functionName),
  );
  const macroTask = tasks.filter((task) =>
    macroTaskApis.includes(task.functionName),
  );
  return { microTask, macroTask };
}

export async function moveToQueue(tasks) {
  for (const task of tasks) {
    if (task.type === 'microTask') {
      microTaskQueue.addTask(task);
    } else if (task.type === 'macroTask') {
      macroTaskQueue.addTask(task);
    }
    await delay(2000);
  }
}
