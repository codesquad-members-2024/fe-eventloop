import { getAst, getCalleeName, findCallExpressions } from "./codeAnalyze.js";
import moveTasks from "./view.js";

function enterButtonClick() {
  const ast = getAst();
  const callExpressions = findCallExpressions(ast);
  const calleeNames = callExpressions.map((callExpression) =>
    getCalleeName(callExpression)
  );
  const image = document.querySelector(".event-loop-area img");
  image.style.animation = "rotate_image 6s linear infinite";
  moveTasks(calleeNames).then(() => {
    image.style.animation = "pause";
  });
}

function onEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default onEvent;
