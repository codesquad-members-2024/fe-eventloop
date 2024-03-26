import findCallExpressions from "./codeAnalyze.js";

function getAst() {
  const textareaValue = document.getElementById("enter-code").value;
  return acorn.parse(textareaValue, { ecmaVersion: 2020 });
}

function enterButtonClick() {
  const ast = getAst();
  const callExpression = findCallExpressions(ast);
  console.log(callExpression);
}

function onEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default onEvent;
