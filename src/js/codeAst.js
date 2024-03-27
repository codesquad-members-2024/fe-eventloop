import { getCalleeName, findCallExpressions } from "./codeAnalyze.js";

function getAst() {
  const textareaValue = document.getElementById("enter-code").value;
  return acorn.parse(textareaValue, { ecmaVersion: 2020 });
}

function enterButtonClick() {
  const ast = getAst();
  const callExpressions = findCallExpressions(ast);
  const calleeNames = callExpressions.map((callExpression) => getCalleeName(callExpression));
  console.log(callExpressions, calleeNames); // 삭제예정
}

function onEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default onEvent;
