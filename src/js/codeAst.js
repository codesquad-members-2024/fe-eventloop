import { getCalleeName, findCallExpressions } from "./codeAnalyze.js";
import moveTasks from "./view.js";

function getAst() {
  const textareaValue = document.getElementById("enter-code").value;
  return acorn.parse(textareaValue, { ecmaVersion: 2020 });
}

function enterButtonClick() {
  const ast = getAst();
  const callExpressions = findCallExpressions(ast);
  const calleeNames = callExpressions.map((callExpression) =>
    getCalleeName(callExpression)
  );
  moveTasks(calleeNames);
}

function onEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default onEvent;
