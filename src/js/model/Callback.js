export const MICRO_TASK_PROTOTYPES = {
  then: "Promise",
  catch: "Promise",
  finally: "Promise",
  MutationObserver: "MutationObserver",
  queueMicrotask: "Window",
  nextTick: "Process",
};
export const MACRO_TASK_PROTOTYPES = {
  setTimeout: "Window",
  setInterval: "Window",
  setImmediate: "Window",
  clearInterval: "Window",
  clearTimeout: "Window",
  requestAnimationFrame: "Window",
  cancelAnimationFrame: "Window",
  requestIdleCallback: "Window",
  cancelIdleCallback: "Window",
};

const INCREMENT = 1;

export class Callback {
  constructor(node, calleeName, index) {
    this.node = node;
    this.calleeName = calleeName;
    this.index = index;
  }

  getCalleeName() {
    return this.calleeName;
  }
}

export class Microtask extends Callback {
  toString() {
    return `<p>${MICRO_TASK_PROTOTYPES[this.calleeName]} Callback <br>(${this.calleeName}) ${this.index + INCREMENT}</p>`;
  }
}

export class Macrotask extends Callback {
  toString() {
    return `<p>${MACRO_TASK_PROTOTYPES[this.calleeName]} Callback <br>(${this.calleeName}) ${this.index + INCREMENT}</p>`;
  }
}
