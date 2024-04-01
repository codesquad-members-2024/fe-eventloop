export const microTaskApis = ['queueMicrotask', 'Promise', 'process.nextTick'];
export const macroTaskApis = ['setTimeout', 'setInterval', 'setImmediate'];
export const promiseMethods = ['then'];

export function CallStack() {
  this.stack = [];
  this.observers = []; // Observer 목록
}

CallStack.prototype.addObserver = function (observer) {
  this.observers.push(observer);
};

CallStack.prototype.notifyObservers = function () {
  this.observers.forEach((observer) => observer.update(this));
};

CallStack.prototype.addTask = function (task) {
  this.stack.push(task);
  this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
};

CallStack.prototype.removeTask = function () {
  const task = this.stack.pop();
  this.notifyObservers(); // 콜 스택 업데이트 시 옵저버에게 알림
  return task;
};

export class WebAPI {}
export class TaskQueue {}
export class EventLoop {}
