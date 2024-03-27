const callExpressions = [];

const microTasks = ["process", "Promise", "async", "then"];
const macroTasks = ["setTimeout", "setInterval"];

function getCalleeName(node) {
  const callee = node.callee;
  if (callee?.type === "Identifier") {
    // 앞이 undefined나 null이면 undefined
    return callee.name;
  } else if (callee?.property?.type === "Identifier") {
    return callee.property.name;
  } else if (
    callee?.object?.type === "Identifier" &&
    callee?.property?.type === "Identifier"
  ) {
    return callee.object.name + "." + callee.property.name;
  } else {
    return null;
  }
}

function findCallExpressions(node) {
  if (node.type === "CallExpression") {
    const calleeName = getCalleeName(node);
    if (microTasks.includes(calleeName) || macroTasks.includes(calleeName)) {
      callExpressions.push(node);
    }
  }
  for (const key in node) {
    if (node[key] instanceof Object) {
      findCallExpressions(node[key]);
    }
  }
  return callExpressions;
}

export { getCalleeName, findCallExpressions };
