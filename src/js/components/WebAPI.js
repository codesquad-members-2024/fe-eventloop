import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class WebAPI {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-web">${code}</span>`;
	}

	push() {
		Elements.$webAPI.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".web-api .code-box");
		box.remove();
	}

	isPromise(api) {
		const WEP_API = ["Promise", "then", "catch"];
		return WEP_API.includes(api);
	}
}

export default WebAPI;
