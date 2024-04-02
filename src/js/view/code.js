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

function handleButtonClick($eventLoop, stopState, code) {
	moveTasks(code, stopState).then(() => {
		$eventLoop.classList.remove("active");
	});
}

const EventTarget = {
	START: ($eventLoop, stopState, code) => {
		$eventLoop.classList.add("active");
		stopState.stop = false;
		handleButtonClick($eventLoop, stopState, code);
	},
	STOP: ($eventLoop, stopState) => {
		$eventLoop.classList.remove("active");
		stopState.stop = true;
	},
};

function onEvent() {
	const $eventLoop = document.querySelector(".event-loop-area img");
	const $enterButton = document.querySelector(".enter-btn-wrap");
	const code = getCode();
	const stopState = {
		stop: false,
	};

	$enterButton.addEventListener("click", ({ target }) =>
		EventTarget[target.innerText]?.($eventLoop, stopState, code)
	);
}

export default onEvent;
