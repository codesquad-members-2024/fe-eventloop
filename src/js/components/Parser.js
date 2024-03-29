import { PARSER } from "../utils/Constants.js";

const Parser = {
	getLines(code) {
		const splitedCode = code.split("\n").filter((v) => v);
		const lines = [];
		for (let i = 0; i < splitedCode.length; i++) {
			if (splitedCode[i].endsWith(");")) lines.push(splitedCode[i]);
			else i = Parser.hasCallBack(i, splitedCode, lines);
		}
		return lines;
	},
	hasCallBack(i, splitedCode, lines) {
		const regexp = /[}|\)](.*)\)/;
		let str = ``;
		for (let t = i; t < splitedCode.length; t++) {
			str += splitedCode[t].trim();
			if (regexp.test(splitedCode[t])) {
				lines.push(str);
				return t;
			}
		}
	},
	matchCallbackFn(line) {
		const callback = this.callbackFilter(line);
		if (callback.length > PARSER.maxLength)
			return this.fnExpressionFilter(callback) + "{Function body}";
		return callback;
	},
	isWebAPI(line) {
		const WEB_API_REGEXP = [
			/setTimeout/,
			/setInterval/,
			/setImmediate/,
			/Promise/,
			/then/,
			/fetch/,
			/catch/,
		];
		const result = WEB_API_REGEXP.find((regexp) => regexp.test(line));
		if (result) return result.toString().slice(PARSER.firstChar, PARSER.lastChar);
		return false;
	},
	callbackFilter(line) {
		const braces = line.match(/\(\) => {.*}/)?.join();
		const parentheses = line
			.match(/\(.*\)/)
			?.join()
			.slice(PARSER.firstChar, PARSER.lastChar);
		const fnExpression = line.match(/function().+}/)?.join();
		return braces || parentheses || fnExpression;
	},
	fnExpressionFilter(callback) {
		const arrowFn = callback.match(/.+=>/)?.join();
		const fnExpression = callback.match(/function\(\)/)?.join();
		return arrowFn || fnExpression;
	},
};

export default Parser;
