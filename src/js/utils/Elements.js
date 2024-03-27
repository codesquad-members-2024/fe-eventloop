const Elements = {
	$textArea: "",
	$buttons: "",
	$codeExcute: "",
	$callStack: "",
	$webAPI: "",
	$taskQueue: "",
	$eventLoop: "",
	init() {
		Elements.$buttons = document.querySelector(".code__input__btn"); //TODO 한번에 가져오는걸로 refactor
		Elements.$textArea = document.querySelector(".code__input > textarea");
		Elements.$codeExcute = document.querySelector(".code__excute");
		Elements.$callStack = document.querySelector(".call-stack > .box");
		Elements.$webAPI = document.querySelector(".web-api > .box");
		Elements.$micro = document.querySelector(".microtask-queue > .box");
		Elements.$taskQueue = document.querySelector(".macrotask-queue > .box");
		Elements.$eventLoop = document.querySelector(".event-loop__loop-arrow > i");
	},
};

export default Elements;
