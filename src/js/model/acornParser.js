const MICRO_NAMES = ["then", "catch"]
const MACRO_NAMES = ["setTimeout"]

const createQueueCallbackInfo = (originalCode, callBackNode, parseNode) => {
    const callBackNodeBody = (callBackNode.body.body ?? [])[0] || callBackNode.body;
    const thenCallCode = originalCode.substring(callBackNodeBody.start, callBackNodeBody.end);
    const delay = parseNode.arguments[1]?.value ?? undefined;
    return {
        type: (parseNode.callee.property && parseNode.callee.property.name) || "setTimeout",
        callBackCode: thenCallCode,
        delay: delay,
        node: callBackNode,
    };
};

const isMicroTask = (callee) => callee.type === "MemberExpression" && MICRO_NAMES.includes(callee.property.name)
const isMacroTask = (callee) => callee.type === "Identifier" && MACRO_NAMES.includes(callee.name)

export const extractCallbackCode = (parseNode, originalCode, nodeList = []) => {
    if (parseNode.type === 'CallExpression') {
        const callee = parseNode.callee;
        const callBackNode = parseNode.arguments[0];
        if(isMicroTask(callee) || isMacroTask(callee)) nodeList.push(createQueueCallbackInfo(originalCode, callBackNode, parseNode)); 
    }

    Object.keys(parseNode).forEach((key) => {
        const child = parseNode[key];
        if (typeof child === "object" && child !== null) {
            extractCallbackCode(child, originalCode, nodeList);
        }
    });

    return nodeList.reverse();
};

export {isMicroTask, isMacroTask}