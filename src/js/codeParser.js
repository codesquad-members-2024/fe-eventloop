import { getData } from "./requestApi.js";

export async function parseLiteral() {
  const codeInputArr = await getData("codeInput");
  const literal = codeInputArr[codeInputArr.length - 1].code;
  const ast = acorn.parse(literal, { ecmaVersion: "latest" });

  const parser = new AsyncFunctionParser(literal, ast);
  parser.findMacroFunctions();
  parser.findMicroFunctions();
  console.log(parser.macroQueue);
  console.log(parser.microQueue);
}

class AsyncFunctionParser {
  constructor(literal, ast) {
    this.literal = literal;
    this.ast = ast;
    this.macroQueue = [];
    this.microQueue = [];
  }
  addToMacroQueue(functionName, callback, delay) {
    this.macroQueue.push({ functionName, callback, delay });
  }
  addToMicroQueue(methodName, callback) {
    this.microQueue.push({ methodName, callback });
  }
  findMacroFunctions() {
    const asycTypes = ["setTimeout", "setInterval", "setImmediate"];
    const traverse = (node) => {
      if (node.type === "CallExpression") {
        if (asycTypes.includes(node.callee.name)) {
          const functionName = node.callee.name;
          if (node.arguments.length > 0) {
            const callbackArg = node.arguments[node.arguments.length - 2];
            const callback = this.literal.slice(
              callbackArg.start,
              callbackArg.end
            );
            const delay = node.arguments[node.arguments.length - 1].value;
            this.addToMacroQueue(functionName, callback, delay);
          }
        }
      }
      for (const key in node) {
        if (typeof node[key] === "object" && node[key] !== null) {
          if (Array.isArray(node[key])) {
            node[key].forEach((child) => traverse(child));
          } else {
            traverse(node[key]);
          }
        }
      }
    };
    traverse(this.ast);
  }
  findMicroFunctions() {
    const asyncMethods = [".then", ".catch", ".finally"];

    const traverse = (node) => {
      if (node.type === "CallExpression" && node.callee.property) {
        const methodName = node.callee.property.name;
        if (asyncMethods.includes(`.${methodName}`)) {
          const callbackNode = node.arguments[0];
          if (callbackNode) {
            const callback = this.literal.slice(
              callbackNode.start,
              callbackNode.end
            );
            this.addToMicroQueue(methodName, callback);
          }
        }
      }

      for (const key in node) {
        if (typeof node[key] === "object" && node[key] !== null) {
          if (Array.isArray(node[key])) {
            node[key].forEach((child) => traverse(child));
          } else {
            traverse(node[key]);
          }
        }
      }
    };

    traverse(this.ast);
  }
}
