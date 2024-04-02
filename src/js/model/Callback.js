const SIMPLE_ARROW_REGEX = /=>\s*[^{]+/;
const BLOCK_ARROW_REGEX = /=>\s*{[^{}]*}/;
const GENERAL_ANONYM_REGEX = /function\(\)\s*{[^{}]*}/g;

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

export const replaceCallbackBody = (codeText) => {
  if (BLOCK_ARROW_REGEX.test(codeText)) return codeText.replace(BLOCK_ARROW_REGEX, "=> {...}");
  if (SIMPLE_ARROW_REGEX.test(codeText)) return codeText.replace(SIMPLE_ARROW_REGEX, "=> ...");
  if (GENERAL_ANONYM_REGEX.test(codeText)) return codeText.replace(GENERAL_ANONYM_REGEX, "function() {...}");

  throw new Error("입력한 값이 콜백 함수가 아닙니다.");
};

export class Callback {
  constructor(codeBlock, calleeName) {
    this.codeBlock = codeBlock;
    this.calleeName = calleeName;
  }

  getCalleeName() {
    return this.calleeName;
  }
}

export class Microtask extends Callback {
  toString() {
    const prototypeName = MICRO_TASK_PROTOTYPES[this.calleeName];

    return `<pre>${prototypeName}.${this.calleeName} : ${replaceCallbackBody(this.codeBlock)}</pre>`;
  }
}

export class Macrotask extends Callback {
  toString() {
    const prototypeName = MACRO_TASK_PROTOTYPES[this.calleeName];

    return `<pre>${prototypeName}.${this.calleeName} : ${replaceCallbackBody(this.codeBlock)}</pre>`;
  }
}
