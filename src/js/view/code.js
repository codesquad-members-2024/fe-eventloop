import AST from "../components/AST.js";
import { CODE } from "../utils/constans.js";
import moveTasks from "./task.js";

function initTextarea() {
	const $textarea = document.querySelector(".enter-code");
	$textarea.value = CODE;
	return $textarea;
}

function getCode() {
	const $textarea = initTextarea();
	const ast = AST.get($textarea);
	const calleeNames = AST.findCallExpressions(ast);
	return calleeNames;
}

function handleButtonClick(code) {
	const image = document.querySelector(".event-loop-area img");
	image.classList.add("active");

	moveTasks(code).then(() => {
		image.classList.remove("active");
	});
}

function onEvent() {
	const code = getCode();
	const $enterButton = document.querySelector(".enter-btn");
	$enterButton.addEventListener("click", () => handleButtonClick(code));
}

export default onEvent;
