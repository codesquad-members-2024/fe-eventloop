// import { CallStack, WebAPI, TaskQueue, EventLoop } from './taskModel.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

const test = parseCode(code);
console.log(test);
