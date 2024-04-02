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
	const EventTarget = {
		START: (code) => handleButtonClick(code),
		STOP: () => {},
	};
	const code = getCode();

	const $enterButton = document.querySelector(".enter-btn-wrap");
	$enterButton.addEventListener("click", ({ target }) => {
		EventTarget[target.innerText]?.(code);
	});
}

export default onEvent;
