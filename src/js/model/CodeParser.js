import parserUtils from "./ParserUtils.js";

const validateAsyncFunc = (node) =>
  parserUtils.isMicroTask(node) || parserUtils.isMacroTask(node);

const traverse = (node, callbacks = []) => {
  Object.values(node).forEach((childNode) => {
    if (parserUtils.isObjectType(childNode)) traverse(childNode, callbacks);
  });

  if (parserUtils.getCalleeName(node)) {
    if (validateAsyncFunc(node)) callbacks.push(node);
  }

  return callbacks;
};

export async function parseLiteral(code) {
  const ast = acorn.parse(code, { ecmaVersion: "latest" });

  const parser = new AsyncFunctionParser(code, ast);
  parser.findAsyncFunctions();
  parser.extractCallbacks();
  const callbacks = parser.callbacks;
  return callbacks;
};

class AsyncFunctionParser {
  constructor(code, ast) {
    this.code = code;
    this.ast = ast;
    this.asyncNode = [];
    this.callbacks = [];
  }

  findAsyncFunctions() {
    this.asyncNode = traverse(this.ast);
  }

  extractCallbacks() {
    this.asyncNode.forEach((node) => {
      const funcType = node.callee.name
        ? node.callee.name
        : node.callee.property.name;
      const callbackArg = node.arguments[0];
      const callback = this.code.slice(callbackArg.start, callbackArg.end);
      this.callbacks.push({ funcType: funcType, callback: callback });
    });
  }
}
