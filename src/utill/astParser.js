export function AstParser(code) {
    this.code = code
    this.callBack
    this.delayTime
}

AstParser.prototype.extractCallbackAndDelay = function(node) {
    const macroMethod = ["setTimeout", "setInterval", "setImmediate", "clearInterval", "clearTimeout"]
    if (node.type === "CallExpression" && macroMethod.includes(node.callee.name)) {
        this.callBack = node.arguments[0];
        this.delayTime = node.arguments[1].value;
    }
    for (const key in node) {
        if (node.hasOwnProperty(key) && typeof node[key] === "object" && node[key] !== null) {
            this.extractCallbackAndDelay(node[key]);
        }
    }
    const callBackFunction = this.transformNode(this.callBack)
    return {callBack: callBackFunction, delayTime: this.delayTime }
}

AstParser.prototype.transformNode = function(node) {
    return this.code.substring(node.start, node.end);
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



