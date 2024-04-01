const CALLBACK_EXPRESSIONS = ["CallExpression", "NewExpression"];
const FUNCTION_EXPRESSIONS = ["FunctionExpression", "ArrowFunctionExpression"];
const MICRO_TASK_CALLEES = [
  "then",
  "catch",
  "finally",
  "MutationObserver",
  "Promise",
  "queueMicrotask",
  "nextTick",
];
const MACRO_TASK_CALLEES = [
  "setTimeout",
  "setInterval",
  "setImmediate",
  "clearInterval",
  "clearTimeout",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "requestIdleCallback",
  "cancelIdleCallback",
];
const LATEST_VERSION = "latest";
const NO_ELEMENTS = 0;

const parserUtils = {
  isEmpty(elements) {
    return elements.length === NO_ELEMENTS;
  },

  isValidNodeType({ type }, types) {
    return types.includes(type);
  },

  isCallbackExpression(node) {
    return this.isValidNodeType(node, CALLBACK_EXPRESSIONS);
  },

  isFunction(node) {
    return this.isValidNodeType(node, FUNCTION_EXPRESSIONS);
  },

  isObjectType(node) {
    return node instanceof Object;
  },

  isMicroTask({ callee }) {
    return (
      MICRO_TASK_CALLEES.includes(callee?.name) ||
      MICRO_TASK_CALLEES.includes(callee?.property?.name)
    );
  },

  isMacroTask({ callee }) {
    return (
      callee?.type === "Identifier" && MACRO_TASK_CALLEES.includes(callee?.name)
    );
  },

  getCalleeName({ callee }) {
    return callee?.type === "Identifier"
      ? callee.name
      : callee?.property?.type === "Identifier"
      ? callee.property.name
      : null;
  },
};

export default parserUtils;
