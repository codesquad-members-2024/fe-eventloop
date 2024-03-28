import { TaskComponent } from './component.js';

const microTaskApis = ['queueMicrotask', 'Promise', 'process.nextTick'];
const macroTaskApis = [
  'setTimeout',
  'setInterval',
  'setImmediate',
  'requestAnimationFrame',
];

class CallStack {
  constructor() {
    this.stack = [];
  }
  push(task) {
    this.stack.push(task);
  }
  pop() {
    return this.stack.pop();
  }
  isEmpty() {
    return this.stack.length === 0;
  }
}
class WebAPI {
  constructor() {
    this.stack = [];
  }
  checkTaskType(task, time = 0) {
    time = time || 0;
    if (microTaskApis.includes(task)) {
      microtask.addTask(task);
    } else if (macroTaskApis.includes(task)) {
      macrotask.addTask(task);
    }
  }
  addTask(task) {
    this.task.push(task);
  }
  removeTask(task) {
    this.task = this.task.filter((t) => t !== task);
  }
}
class Task {
  constructor(name) {
    this.id = Math.random();
    this.name = name;
  }
}
class TaskQueue {
  constructor() {
    this.task = [];
  }
  addTask(taskName) {
    const task = new Task(taskName);
    this.task.push(task);
    this.generateTask(task);
  }
  generateTask(task) {
    if (microTaskApis.includes(task.name)) {
      console.log('microtask');
      document.querySelector('#microtask').innerHTML += TaskComponent(
        task.name,
      );
    } else if (macroTaskApis.includes(task.name)) {
      console.log('macrotask');
      document.querySelector('#macrotask').innerHTML += TaskComponent(
        task.name,
      );
    }
  }
  moveToCallStack() {
    if (CallStack.stack.length === 0) return;
    if (CallStack.stack.isEmpty()) {
      const task = this.task.shift();
      CallStack.push(task);
    }
  }
  removeTask(task) {
    this.task = this.task.filter((t) => t !== task);
  }
}

export const callStack = new CallStack([]);
export const webAPI = new WebAPI([]);
export const microtask = new TaskQueue([], microTaskApis);
export const macrotask = new TaskQueue([], macroTaskApis);
