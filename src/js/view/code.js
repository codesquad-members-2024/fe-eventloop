import Elements from '../components/Elements.js';
import { GREEN_CODE, RED_CODE, BTN_CLASS_NAME } from '../utils/Constants.js';
import { analyze } from './analyzer.js';

export const asyncManager = {
	state: false,
	stopAsync() {
		this.state = false;
	},
};

const CLASSNAME_MAP = {
	[BTN_CLASS_NAME.green]: () => (Elements.$textArea.value = GREEN_CODE),
	[BTN_CLASS_NAME.red]: () => (Elements.$textArea.value = RED_CODE),
	[BTN_CLASS_NAME.excute]: () => {
		const code = Elements.$textArea.value;
		Elements.$codeExcute.value = code;
		analyze(code, asyncManager.state);
	},
};

function addEventCodeExcute() {
	Elements.$buttons.addEventListener('click', ({ target }) => {
		CLASSNAME_MAP[target.className]?.();
	});
}

export default addEventCodeExcute;
