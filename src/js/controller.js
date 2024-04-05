import {
  CallStack,
  WebAPI,
  MicroTaskQueue,
  MacroTaskQueue,
  promiseMethods,
  macroTaskApis,
} from './taskModel.js';
import {
  CallStackViewer,
  CallbackAdder,
  CallbackRemover,
  animateQueueToCallstack,
} from './view.js';

const callStack = new CallStack();
const webAPI = new WebAPI();
const microTaskQueue = new MicroTaskQueue();
const macroTaskQueue = new MacroTaskQueue();

const callStackObserver = new CallStackViewer('callStack');
const webAPIObserver = new CallbackAdder('webAPIs', 'to-webAPI');
const microQueueObserver = new CallbackAdder('microTaskQueue', 'to-micro');
const macroQueueObserver = new CallbackAdder('macroTaskQueue', 'to-macro');
callStack.addObserver(callStackObserver);
webAPI.addObserver(webAPIObserver);
microTaskQueue.addObserver(microQueueObserver);
macroTaskQueue.addObserver(macroQueueObserver);

const webAPIRemover = new CallbackRemover('webAPIs');
const microTaskRemover = new CallbackRemover('microTaskQueue');
const macroTaskRemover = new CallbackRemover('macroTaskQueue');
webAPI.addRemoveObserver(webAPIRemover);
microTaskQueue.addRemoveObserver(microTaskRemover);
macroTaskQueue.addRemoveObserver(macroTaskRemover);

const DELAY_TIME = 2000;
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
  const microTasks = tasks.filter((task) =>
    promiseMethods.includes(task.functionName),
  );
  const macroTasks = tasks.filter((task) =>
    macroTaskApis.includes(task.functionName),
  );
  return { microTasks, macroTasks };
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
      callStack.addTask(tasks[i].arguments);
    } else if (tasks[i].type === 'macroTask') {
      animateQueueToCallstack(tasks, i, 'macroTaskQueue', 'to-callstack');
      await delay(1000);
      macroTaskQueue.removeTask();
      callStack.addTask(tasks[i].arguments);
    }
    await delay(1000);
  }
  callStack.resetTask();
}
