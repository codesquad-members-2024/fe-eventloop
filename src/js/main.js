import {
  registerToWebAPI,
  classifyIntoMacroAndMicro,
  moveToQueue,
  moveToCallstack,
} from './controller.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

async function main() {
  const tasks = parseCode(code);
  console.log(tasks);
  await registerToWebAPI(tasks);
  const { microTask, macroTask } = classifyIntoMacroAndMicro(tasks);
  await moveToQueue(microTask);
  await moveToQueue(macroTask);
  await moveToCallstack(microTask);
  moveToCallstack(macroTask);
}

main();
