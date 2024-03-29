const Elements = {
	$textArea: "",
	$buttons: "",
	$codeExcute: "",
	$callStack: "",
	$webAPI: "",
	$taskQueue: "",
	$eventLoop: "",
	init() {
		[this.$textArea, this.$buttons] = document.querySelectorAll(".code__input > *");
		Elements.$codeExcute = document.querySelector(".code__excute");
		[this.$callStack, this.$webAPI] = document.querySelectorAll(".stack-wrap .box");
		[this.$micro, this.$taskQueue] = document.querySelectorAll(".queue-wrap .box");
		Elements.$eventLoop = document.querySelector(".event-loop__loop-arrow > i");
	},
};

export default Elements;
