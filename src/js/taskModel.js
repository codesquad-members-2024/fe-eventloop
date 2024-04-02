export const microTaskApis = ['queueMicrotask', 'Promise', 'process.nextTick'];
export const macroTaskApis = ['setTimeout', 'setInterval', 'setImmediate'];
export const promiseMethods = ['then', 'catch'];

export class CallStack {
  constructor() {
    this.stack = [];
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.stack));
  }

  addTask(task) {
    this.stack.push(task);
    this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
  }

  removeTask() {
    const task = this.stack.pop();
    this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
    return task;
  }

  resetTask() {
    this.stack.length = 0;
    this.notifyObservers();
  }
}

export class WebAPI extends CallStack {
  constructor() {
    super(); // 부모 클래스의 생성자 호출
  }

  addTask(task) {
    this.stack.push(task);
    this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
  }

  removeTask() {
    const task = this.stack.pop();
    this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
    return task;
  }
}

export class TaskQueue {}
export class EventLoop {}
