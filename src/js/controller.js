import {
  CallStack,
  WebAPI,
  MicroTaskQueue,
  MacroTaskQueue,
  promiseMethods,
  macroTaskApis,
} from './taskModel.js';
import {
  CallStackObserver,
  CallbackObserver,
  RemoveCallback,
  animateQueueToCallstack,
} from './view.js';

const callStack = new CallStack();
const webAPI = new WebAPI();
const microTaskQueue = new MicroTaskQueue();
const macroTaskQueue = new MacroTaskQueue();

const callStackObserver = new CallStackObserver('callStack');
const webAPIObserver = new CallbackObserver('webAPIs', 'to-webAPI');
const microQueueObserver = new CallbackObserver('microTaskQueue', 'to-micro');
const macroQueueObserver = new CallbackObserver('macroTaskQueue', 'to-macro');
callStack.addObserver(callStackObserver);
webAPI.addObserver(webAPIObserver);
microTaskQueue.addObserver(microQueueObserver);
macroTaskQueue.addObserver(macroQueueObserver);

const webAPIRemover = new RemoveCallback('webAPIs');
const microTaskRemover = new RemoveCallback('microTaskQueue');
const macroTaskRemover = new RemoveCallback('macroTaskQueue');
webAPI.addRemoveObserver(webAPIRemover);
microTaskQueue.addRemoveObserver(microTaskRemover);
macroTaskQueue.addRemoveObserver(macroTaskRemover);

const DELAY_TIME = 1000;
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function registerToWebAPI(tasks) {
  for (const task of tasks) {
    callStack.addTask(task.functionName || task.type);
    webAPI.addTask(task);
    await delay(DELAY_TIME);
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
      webAPI.removeTask(task);
      microTaskQueue.addTask(task);
    } else if (task.type === 'macroTask') {
      webAPI.removeTask(task);
      macroTaskQueue.addTask(task);
    }
    await delay(DELAY_TIME);
  }
}

export async function moveToCallstack(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].type === 'microTask') {
      animateQueueToCallstack(tasks, i, 'microTaskQueue', 'to-callstack');
      await delay(1000);
      microTaskQueue.removeTask();
    } else if (tasks[i].type === 'macroTask') {
      animateQueueToCallstack(tasks, i, 'macroTaskQueue', 'to-callstack');
      await delay(1000);
      macroTaskQueue.removeTask();
    }
    await delay(1000);
  }
}
