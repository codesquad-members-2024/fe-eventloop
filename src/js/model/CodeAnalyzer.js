const CALLBACK_EXPRESSIONS = ["CallExpression", "NewExpression"];
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

const isEmpty = (elements) => elements.length === NO_ELEMENTS;

const isNodeType = ({ type }, types) => types.includes(type);

const isCallbackExpression = (node) => isNodeType(node, CALLBACK_EXPRESSIONS);

const isFunction = ({ type }) =>
  type === "FunctionExpression" ||
  type === "ArrowFunctionExpression";

const isObjectType = (node) => node instanceof Object;

const isMicrotask = ({ callee }) =>
  MICRO_TASK_CALLEES.includes(callee?.name) ||
  MICRO_TASK_CALLEES.includes(callee?.property?.name);

const isMacrotask = ({ callee }) =>
  callee?.type === "Identifier" &&
  MACRO_TASK_CALLEES.includes(callee?.name);

const getCalleeName = ({ callee }) => {
  return callee?.type === "Identifier"
    ? callee.name
    : callee?.property?.type === "Identifier"
    ? callee.property.name
    : null;
};

const addCallbacks = (node, callbacks) => {
  const functions = node.arguments.filter((arg) => isFunction(arg));

  if (isEmpty(functions)) return;

  const calleeName = getCalleeName(node);
  const callbackNodes = functions.map((node) => ({ node, calleeName }));

  if (isMicrotask(node)) callbacks.push(...callbackNodes);
  if (isMacrotask(node)) callbacks.push(...callbackNodes);
};

const findCallbacks = (node, callbacks = []) => {
  Object.keys(node).forEach((key) => {
    const child = node[key];
    if (isObjectType(child)) findCallbacks(child, callbacks);
  });
  if (isCallbackExpression(node)) addCallbacks(node, callbacks);

  return callbacks;
};

export default function CodeAnalyzer(code) {
  this.options = { ecmaVersion: LATEST_VERSION };
  this.initializeCallbacks(code);
}

CodeAnalyzer.prototype.initializeCallbacks = function (code) {
  this.ast = acorn.parse(code, this.options);
  this.callbacks = findCallbacks(this.ast);
};

CodeAnalyzer.prototype.getCallbacks = function () {
  return this.callbacks;
};
