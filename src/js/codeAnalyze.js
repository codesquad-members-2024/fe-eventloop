function findCallExpressions(ast) {
  const callExpressions = [];
  if (Array.isArray(ast.body)) {
    ast.body.forEach((element) => {
      if (element.expression.type === "CallExpression") {
        callExpressions.push(element.expression);
      }
    });
  }
  return callExpressions;
}

export default findCallExpressions;