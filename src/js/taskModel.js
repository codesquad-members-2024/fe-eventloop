export const microTaskApis = ['queueMicrotask', 'Promise', 'process.nextTick'];
export const macroTaskApis = ['setTimeout', 'setInterval', 'setImmediate'];
export const promiseMethods = ['then', 'catch'];

export class CallStack {
  constructor() {
    this.stack = [];
    this.observers = [];
    this.removeObservers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  addRemoveObserver(observer) {
    this.removeObservers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.stack));
  }

  notifyRemoveObservers(removedStack) {
    this.removeObservers.forEach((observer) => observer.update(removedStack));
  }
  addTask(task) {
    this.stack.push(task);
    this.notifyObservers();
  }

  resetTask() {
    this.stack.length = 0;
    this.notifyObservers();
  }
}

export class WebAPI extends CallStack {
  constructor() {
    super();
  }

  addTask(task) {
    this.stack.push(task);
    this.notifyObservers();
  }

  removeTask(task) {
    const targetTask = task.arguments[0];
    const targetIndex = this.stack.findIndex(
      (item) => item.arguments[0] === targetTask,
    );
    this.stack.splice(targetIndex, 1);
    this.notifyRemoveObservers(this.stack);
  }
}

export class MicroTaskQueue extends CallStack {
  constructor() {
    super();
  }

  addTask(task) {
    this.stack.push(task);
    this.notifyObservers();
  }

  removeTask() {
    const task = this.stack.shift();
    this.notifyRemoveObservers(this.stack);
    return task;
  }
}

export class MacroTaskQueue extends CallStack {
  constructor() {
    super();
  }

  addTask(task) {
    this.stack.push(task);
    this.notifyObservers();
  }

  removeTask() {
    const task = this.stack.shift();
    this.notifyRemoveObservers(this.stack);
    return task;
  }
}
