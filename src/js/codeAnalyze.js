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

export default findCallExpressions;