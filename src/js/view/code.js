import Elements from "../components/Elements.js";
import { GREEN_CODE, RED_CODE, BTN_CLASS_NAME } from "../utils/Constants.js";
import { analyze } from "./analyzer.js";

const CLASSNAME_MAP = {
	[BTN_CLASS_NAME.green]: () => (Elements.$textArea.value = GREEN_CODE),
	[BTN_CLASS_NAME.red]: () => (Elements.$textArea.value = RED_CODE),
	[BTN_CLASS_NAME.excute]: () => {
		const code = Elements.$textArea.value;
		Elements.$codeExcute.value = code;
		analyze(code);
	},
};

function addEvnetCodeExcute() {
	Elements.$buttons.addEventListener("click", ({ target }) => CLASSNAME_MAP[target.className]?.());
}

export default addEvnetCodeExcute;
