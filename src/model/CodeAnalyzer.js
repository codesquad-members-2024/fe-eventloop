const MICRO_TASK_CALLEES = ["then", "catch", "finally"];
const MACRO_TASK_CALLEES = [
  "setTimeout",
  "setInterval",
  "setImmediate",
  "requestAnimationFrame",
];
const NO_ELEMENTS = 0;

const isEmpty = (elements) => elements.length === NO_ELEMENTS;

const isCallExpression = (node) => node.type === "CallExpression";

const isFunction = (argument) =>
  argument.type === "FunctionExpression" ||
  argument.type === "ArrowFunctionExpression";

const isObjectType = (node) => typeof node === "object" && node !== null;

const isMicrotask = (node) =>
  node.callee &&
  node.callee.property &&
  MICRO_TASK_CALLEES.includes(node.callee.property.name);

const isMacrotask = (node) =>
  node.callee &&
  node.callee.type === "Identifier" &&
  MACRO_TASK_CALLEES.includes(node.callee.name);

const getCalleeName = (node) => {
  return node.callee?.type === "Identifier"
    ? node.callee.name
    : node.callee?.property?.type === "Identifier"
    ? node.callee.property.name
    : null;
};

const addCallbacks = (node, callbacks) => {
  const functions = node.arguments.filter((arg) => isFunction(arg));
  const calleeName = getCalleeName(node);

  if (!isEmpty(functions)) {
    const callbackObjects = functions.map((node) => ({ node, calleeName }));
    if (isMicrotask(node)) callbacks.microtasks.push(...callbackObjects);
    if (isMacrotask(node)) callbacks.macrotasks.push(...callbackObjects);
  }
};

const findCallbacks = (node, callbacks = { microtasks: [], macrotasks: [] }) => {
  if (isCallExpression(node)) addCallbacks(node, callbacks);

  Object.keys(node).forEach((key) => {
    const child = node[key];
    if (isObjectType(child)) findCallbacks(child, callbacks);
  });

  return callbacks;
};