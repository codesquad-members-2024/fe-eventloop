const CALLBACK_EXPRESSIONS = [
  "CallExpression",
  "NewExpression",
  //"AwaitExpression",
];
const MICRO_TASK_CALLEES = [
  "then",
  "catch",
  "finally",
  "MutationObserver",
  "queueMicrotask",
  "nextTick"
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

const isNodeType = (node, types) => types.includes(node.type);

const isCallbackExpression = (node) =>
  isNodeType(node, CALLBACK_EXPRESSIONS);

const isFunction = (argument) =>
  argument.type === "FunctionExpression" ||
  argument.type === "ArrowFunctionExpression";

const isObjectType = (node) => node instanceof Object;

const isMicrotask = (node) => 
  MICRO_TASK_CALLEES.includes(node.callee?.name) ||
  MICRO_TASK_CALLEES.includes(node.callee?.property?.name);

const isMacrotask = (node) =>
  node.callee?.type === "Identifier" &&
  MACRO_TASK_CALLEES.includes(node.callee?.name);

const getCalleeName = (node) => {
  return node.callee?.type === "Identifier"
    ? node.callee.name
    : node.callee?.property?.type === "Identifier"
      ? node.callee.property.name
      : null;
};

const addCallbacks = (node, callbacks) => {
  const functions = node.arguments.filter((arg) => isFunction(arg));

  if (isEmpty(functions)) return;
  
  const calleeName = getCalleeName(node);
  const callbackNodes = functions.map((node) => ({ node, calleeName }));

  if (isMicrotask(node)) callbacks.microtasks.push(...callbackNodes);
  if (isMacrotask(node)) callbacks.macrotasks.push(...callbackNodes);
};

const findCallbacks = (node, callbacks = { microtasks: [], macrotasks: [] }) => {
  if (isCallbackExpression(node)) addCallbacks(node, callbacks);

  Object.keys(node).forEach((key) => {
    const child = node[key];
    if (isObjectType(child)) findCallbacks(child, callbacks);
  });

  return callbacks;
};

export default function CodeAnalyzer(code) {
  this.options = { ecmaVersion: LATEST_VERSION };
  this.ast = null;
  this.callbacks = null;
  
  this.initializeCallbacks(code);
}

CodeAnalyzer.prototype.initializeCallbacks = function(code) {
  this.ast = acorn.parse(code, this.options);
  this.callbacks = findCallbacks(this.ast);
};

CodeAnalyzer.prototype.getCallbacks = function() {
  return this.callbacks;
};
