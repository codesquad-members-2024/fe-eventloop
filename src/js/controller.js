import {
  CallStack,
  WebAPI,
  MicroTaskQueue,
  MacroTaskQueue,
} from './taskModel.js';
import {
  CallStackViewer,
  CallbackAdder,
  CallbackRemover,
  animateQueueToCallstack,
} from './view.js';
import { delay, filterTasksByType } from './util.js';

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

export async function registerToWebAPI(tasks) {
  for (const task of tasks) {
    callStack.addTask(task.functionName);
    webAPI.addTask(task);
    await delay(DELAY_TIME);
  }
  callStack.resetTask();
}

export function classifyIntoMacroAndMicro(tasks) {
  const microTasks = filterTasksByType(tasks, 'microTask');
  const macroTasks = filterTasksByType(tasks, 'macroTask');
  return { microTasks, macroTasks };
}

export async function moveToQueue(tasks) {
  for (const task of tasks) {
    const { type } = task;
    webAPI.removeTask(task);
    if (type === 'microTask') {
      microTaskQueue.addTask(task);
    } else if (type === 'macroTask') {
      macroTaskQueue.addTask(task);
    }
    await delay(DELAY_TIME);
  }
}

export async function moveToCallstack(tasks) {
  for (const task of tasks) {
    const { type, callback } = task;
    const queueName = `${type}Queue`;
    animateAndMoveToCallstack(tasks, task, queueName);
    await delay(DELAY_TIME / 2);
    removeFromQueue(queueName);
    callStack.addTask(callback);
    await delay(DELAY_TIME / 2);
  }
  callStack.resetTask();
}

function animateAndMoveToCallstack(tasks, task, queueName) {
  const currentIndex = tasks.indexOf(task);
  animateQueueToCallstack(tasks, currentIndex, queueName, 'to-callstack');
}

function removeFromQueue(queueName) {
  queueName === 'microTaskQueue'
    ? microTaskQueue.removeTask()
    : macroTaskQueue.removeTask();
}
