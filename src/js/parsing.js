import * as acorn from 'acorn';
import * as acornWalk from 'acorn-walk';
import { millisecondToSecond } from './util.js';
import { microTaskApis, macroTaskApis, promiseMethods } from './taskModel.js';

export function parseCode(code) {
  const ast = acorn.parse(code, { ecmaVersion: 2020 });
  const tasks = [];

  acornWalk.simple(ast, {
    CallExpression(node) {
      let functionName = null;
      let taskType = null;
      let isPromiseMethod = false;

      if (node.callee.type === 'Identifier') {
        functionName = node.callee.name;
        if (microTaskApis.includes(functionName)) {
          taskType = 'microTask';
        } else if (macroTaskApis.includes(functionName)) {
          taskType = 'macroTask';
        }
      } else if (
        node.callee.type === 'MemberExpression' &&
        node.callee.property
      ) {
        functionName = node.callee.property.name;
        if (promiseMethods.includes(functionName)) {
          isPromiseMethod = true;
          taskType = 'microTask';
        }
      }

      if (taskType || isPromiseMethod) {
        const argumentsDetail = node.arguments.map((arg) => {
          if (arg.type === 'Literal') {
            return arg.value;
          } else if (
            arg.type === 'FunctionExpression' ||
            arg.type === 'ArrowFunctionExpression'
          ) {
            return 'callback function';
          } else {
            return 'unknown';
          }
        });

        tasks.push({
          functionName,
          arguments: argumentsDetail,
          type: taskType,
        });

        argumentsDetail.forEach((arg) => {
          if (arg === 'callback function') {
            tasks.push({
              type: 'callback',
              name: 'anonymous callback',
              taskType: taskType,
            });
          }
        });
      }
    },
  });

  return tasks;
}
