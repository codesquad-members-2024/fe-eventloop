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

  notifyRemoveObservers() {
    this.removeObservers.forEach((observer) => observer.update(this.stack));
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

  removeTask() {
    this.stack.shift();
    this.notifyRemoveObservers();
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
    const task = this.stack.pop();
    this.notifyObservers();
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
    const task = this.stack.pop();
    this.notifyObservers();
    return task;
  }
}
