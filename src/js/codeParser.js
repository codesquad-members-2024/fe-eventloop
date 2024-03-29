import { getData } from "./requestApi.js";

export async function parseLiteral() {
  const codeInputArr = await getData("codeInput");
  const literal = codeInputArr[codeInputArr.length - 1].code;
  const ast = acorn.parse(literal, { ecmaVersion: "latest" });

  const parser = new AsyncFunctionParser(literal, ast);
  parser.findAsyncFunctions();
  parser.extractCallbacks();
  const callbacks = parser.callbacks;
  return callbacks;
}

class AsyncFunctionParser {
  constructor(literal, ast) {
    this.literal = literal;
    this.ast = ast;
    this.asyncNode = [];
    this.callbacks = [];
  }
  findAsyncFunctions() {
    const asyncType = ["setTimeout", "setInterval", "setImmediate"];
    const methodType = ["then", "catch", "finally"];
    const traverse = (node) => {
      if (node.type === "CallExpression") {
        const callee = node.callee;
        if (this.validateAsyncFunc(callee, methodType, asyncType)) {
          this.asyncNode.push(node);
        }
      }

      for (const key in node) {
        if (typeof node[key] === "object" && node[key] !== null) {
          traverse(node[key]);
        }
      }
    };

    traverse(this.ast);
  }
  validateAsyncFunc(callee, methodType, asyncType) {
    return (
      (callee.type === "MemberExpression" &&
        methodType.includes(callee.property.name)) ||
      (callee.type === "Identifier" && asyncType.includes(callee.name))
    );
  }
  extractCallbacks() {
    this.asyncNode.forEach((node) => {
      const funcType = node.callee.name
        ? node.callee.name
        : node.callee.property.name;
      const callbackArg = node.arguments[0];
      const callback = this.literal.slice(callbackArg.start, callbackArg.end);
      this.callbacks.push({ funcType: funcType, callback: callback });
    });
  }
}
