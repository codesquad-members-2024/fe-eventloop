const isCallExpression = (node) => node.type === "CallExpression";

const isFunction = (argument) => argument.type === "FunctionExpression" || argument.type === "ArrowFunctionExpression"; 

const isObjectType = (node) => typeof node === "object" && node !== null;

const findCallbacks = (node, callbacks = []) => {
  if (isCallExpression(node)) {
    const functions = node.arguments.filter((arg) => isFunction(arg));

    callbacks.push(...functions);
  }

  Object.keys(node).forEach((key) => {
    const child = node[key];
    
    if (isObjectType(child)) findCallbacks(child, callbacks);
  });

  return callbacks;
};