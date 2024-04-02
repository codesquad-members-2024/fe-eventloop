import { getAst, getCalleeName, findCallExpressions } from "./codeAnalyze.js";
import moveTasks from "./view.js";

function enterButtonClick() {
  const ast = getAst();
  const callExpressions = findCallExpressions(ast);
  const calleeNames = callExpressions.map((callExpression) =>
    getCalleeName(callExpression)
  );
  const image = document.querySelector(".event-loop-area img");
  image.classList.add("active");

  moveTasks(calleeNames).then(() => {
    image.classList.remove("active");
  });
}

function onEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default onEvent;
