import parserUtils from "./ParserUtils.js";

const FIRST_INDEX = 0;

const traverse = (node, callbacks = []) => {
  Object.values(node).forEach((childNode) => {
    if (parserUtils.isObjectType(childNode)) traverse(childNode, callbacks);
  });

  if (parserUtils.getCalleeName(node)) {
    if (parserUtils.isAsyncFunction(node)) callbacks.push(node);
  }

  return callbacks;
};

export function parseLiteral(code) {
  const ast = acorn.parse(code, { ecmaVersion: "latest" });

  const parser = new AsyncFunctionParser(code, ast);
  return parser.getCallbacks();
}

export class AsyncFunctionParser {
  constructor(code, ast) {
    this.code = code;
    this.ast = ast;
    this.asyncNodes = this.findAsyncFunctions(ast);
    this.callbacks = this.extractCallbacks(this.asyncNodes);
  }

  findAsyncFunctions(ast) {
    return traverse(ast);
  }

  extractCallbacks(asyncNodes) {
    return asyncNodes.map((node) => {
      const calleeName = parserUtils.getCalleeName(node);
      const callbackArg = node.arguments[FIRST_INDEX];
      const callback = this.code.slice(callbackArg.start, callbackArg.end);
      return { calleeName: calleeName, callback: callback };
    });
  }

  getCallbacks() {
    return this.callbacks;
  }
}
