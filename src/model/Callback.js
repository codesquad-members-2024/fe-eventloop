const MICRO_TASK_PROTOTYPES = {
  then: "Promise",
  catch: "Promise",
  finally: "Promise",
  MutationObserver: "MutationObserver",
  queueMicrotask: "Window",
  nextTick: "Process",
};

const MACRO_TASK_PROTOTYPES = {
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

export class Callback {
  node;
  calleeName;

  constructor(node, calleeName) {
    this.node = node;
    this.calleeName = calleeName;
  }

  getCalleeName() {
    return this.calleeName;
  }
}

export class Microtask extends Callback {
  toString() {
    return `${MICRO_TASK_PROTOTYPES[this.calleeName]} Callback`;
  }
}

export class Macrotask extends Callback {
  toString() {
    return `${MACRO_TASK_PROTOTYPES[this.calleeName]} Callback`;
  }
}
