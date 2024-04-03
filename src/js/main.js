import {
  registerToWebAPI,
  classifyIntoMacroAndMicro,
  moveToQueue,
} from './controller.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

async function main() {
  const tasks = parseCode(code);
  console.log(tasks);
  await registerToWebAPI(tasks);
  const { microTask, macroTask } = classifyIntoMacroAndMicro(tasks);
  await moveToQueue(microTask);
  moveToQueue(macroTask);
}

main();
