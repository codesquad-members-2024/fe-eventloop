import parserUtils from "./ParserUtils.js";

const FIRST_INDEX = 0;

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
}

export class AsyncFunctionParser {
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
      const calleeName = parserUtils.getCalleeName(node);
      const callbackArg = node.arguments[FIRST_INDEX];
      const callback = this.code.slice(callbackArg.start, callbackArg.end);
      this.callbacks.push({ calleeName: calleeName, callback: callback });
    });
  }

  getCallbacks() {
    return this.callbacks;
  }
}
