import AST from "../components/AST.js";
import { CODE } from "../utils/constans.js";
// import { getAst, getCalleeName, findCallExpressions } from "./codeAnalyze copy.js";
import moveTasks from "../view.js";

function initTextarea() {
	const $textarea = document.querySelector(".enter-code");
	$textarea.value = CODE;
}

function handleButtonClick() {
	const $textarea = document.querySelector(".enter-code");
	const ast = AST.get($textarea);
	// const callExpressions = AST.findCallExpressions(ast);
	const calleeNames = AST.findCallExpressions(ast);
	// const calleeNames = callExpressions // ['then', 'then', 'setTimeout']
	// .map((callExpression) => getCalleeName(callExpression));
	const image = document.querySelector(".event-loop-area img");
	image.classList.add("active");

	moveTasks(["then", "then", "setTimeout", "Promise"]).then(() => {
		image.classList.remove("active");
	});
}

function onEvent() {
	initTextarea();
	const $enterButton = document.querySelector(".enter-btn");
	$enterButton.addEventListener("click", handleButtonClick);
}

export default onEvent;
