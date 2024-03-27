function findCallExpressions(ast) {
  const callExpressions = [];
  if (Array.isArray(ast.body)) {
    ast.body.forEach((node) => {
      if (node.expression.type === "CallExpression") {
        callExpressions.push(node.expression);
      }
    });
  }
  return callExpressions;
}

const microTasks = ["process.nextTick", "Promise", "async"];
const macroTasks = ["setTimeout", "setInterval"];

const isMicroTask = function (name) {
  return microTasks.includes(name);
};

const isMacroTask = function (name) {
  return macroTasks.includes(name);
};

export default findCallExpressions;
