import { ANIMATION } from '../utils/Constants.js';
import Elements from './Elements.js';

function WebAPI(code) {
	const $span = document.createElement('span');
	$span.innerHTML = `${code}`;
	$span && $span.classList.add('code-box', 'goto-web');
	this.block = $span;
	this.targetQueue = 'webApi';
}

WebAPI.prototype.push = function () {
	Elements && Elements.$webAPI.prepend(this.block);
	if (!this.block) return;
	return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
};

WebAPI.prototype.pop = function () {
	const block = document.querySelector('.web-api .code-box');
	if (!block) return;
	setTimeout(() => block.remove());
	return block && block.innerHTML;
};

WebAPI.prototype.isPromise = function (api) {
	const WEP_API = ['Promise', 'then', 'catch'];
	return WEP_API.includes(api);
};

export default WebAPI;
