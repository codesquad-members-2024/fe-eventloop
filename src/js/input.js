/**
 *
 * @param {*} event
 * @returns {string} code
 */
import {
  registerToWebAPI,
  classifyIntoMacroAndMicro,
  moveToQueue,
  moveToCallstack,
} from './controller.js';
import { parseCode } from './parsing.js';
import { code } from './test-code.js';

export function getCode() {
  const runBtn = document.getElementById('buttonRun');
  runBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // const code = document.querySelector('#inputCode').value;

    const tasks = parseCode(code);
    await registerToWebAPI(tasks);
    const { microTasks, macroTasks } = classifyIntoMacroAndMicro(tasks);
    await moveToQueue(microTasks);
    await moveToQueue(macroTasks);
    await moveToCallstack(microTasks);
    moveToCallstack(macroTasks);
  });
}
