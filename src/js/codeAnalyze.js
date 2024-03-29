const callExpressions = [];
const micromacro = [
  "process",
  "Promise",
  "async",
  "then",
  "setTimeout",
  "setInterval",
];

function getAst() {
  const textareaValue = document.getElementById("enter-code").value;
  return acorn.parse(textareaValue, { ecmaVersion: 2020 });
}

function getCalleeName(node) {
  const { callee } = node;
  if (callee?.type === "Identifier") {
    // 앞이 undefined나 null이면 undefined
    return callee.name;
  } else if (callee?.property?.type === "Identifier") {
    return callee.property.name;
  } else if (
    callee?.object?.type === "Identifier" && callee?.property?.type === "Identifier") {
    return callee.object.name + "." + callee.property.name;
  } else {
    return null;
  }
}

function findCallExpressions(node) {
  if (node.type === "CallExpression") {
    const calleeName = getCalleeName(node);
    if (micromacro.includes(calleeName)) {
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

export { getAst, getCalleeName, findCallExpressions };
