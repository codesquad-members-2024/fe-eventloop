import EventLoopHandler from './EventLoopHandler.js';

class SubmitHandler {
  constructor(formId, textId, animationContainerClassNames) {
    this.formId = formId;
    this.textId = textId;
    this.animationContainerClassNames = animationContainerClassNames;
    this.addEventHandler();
    this.userCode = '';
    this.callBacks = [];
  }

  createThenCallbackInfo(originalCode, callBackNode) {
    const callBackNodeBody = callBackNode.body;
    const thenCallCode = originalCode.substring(callBackNodeBody.start, callBackNodeBody.end);
    const callBackInfo = {
      type: 'then',
      callBackCode: thenCallCode,
      node: callBackNode,
    };

    return callBackInfo;
  }

  createCatchCallbackInfo(originalCode, callBackNode) {
    const callBackNodeBody = callBackNode.body;
    const catchCallCode = originalCode.substring(callBackNodeBody.start, callBackNodeBody.end);
    const callBackInfo = {
      type: 'catch',
      callBackCode: catchCallCode,
      node: callBackNode,
    };

    return callBackInfo;
  }

  createSetTimeoutCallbackInfo(originalCode, parseNode, callBackNode) {
    const callBackNodeBody = callBackNode.body.body[0];
    const callBackCode = originalCode.substring(callBackNodeBody.start, callBackNodeBody.end);
    const delay = parseNode.arguments[1].value; // setTimeout의 지연 시간
    const callBackInfo = {
      type: 'setTimeout',
      callBackCode,
      delay,
      node: callBackNode,
    };

    return callBackInfo;
  }

  extractCallbackCode(parseNode, originalCode) {
    if (parseNode.type === 'CallExpression') {
      const callee = parseNode.callee;
      let callBackInfo = null;

      const callBackNode = parseNode.arguments[0];

      // .then, .catch, setTimeout의 콜백 파악
      if (callee.type === 'MemberExpression' && callee.property.name === 'then') {
        callBackInfo = this.createThenCallbackInfo(originalCode, callBackNode);
        if (callBackInfo) this.callBacks.unshift(callBackInfo);
      }

      if (callee.type === 'MemberExpression' && callee.property.name === 'catch') {
        callBackInfo = this.createCatchCallbackInfo(originalCode, callBackNode);
        if (callBackInfo) this.callBacks.unshift(callBackInfo);
      }

      if (callee.type === 'Identifier' && callee.name === 'setTimeout') {
        callBackInfo = this.createSetTimeoutCallbackInfo(originalCode, parseNode, callBackNode);
        if (callBackInfo) this.callBacks.push(callBackInfo);
      }
    }

    // 재귀적으로 자식 노드 순회
    Object.keys(parseNode).forEach((key) => {
      if (parseNode.hasOwnProperty(key)) {
        const child = parseNode[key];
        if (typeof child === 'object' && child !== null) {
          this.extractCallbackCode(child, originalCode);
        }
      }
    });
  }

  createParseCode() {
    const userCodeTarget = document.getElementById(this.textId);
    const userCode = userCodeTarget.value;
    this.userCode = userCode;

    const parseCode = acorn.parse(userCode, {
      sourceType: 'module',
    });

    return parseCode;
  }

  addEventHandler() {
    document.getElementById(this.formId).addEventListener('submit', this.handleFormSubmit);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const parseCode = this.createParseCode();
    parseCode.body.forEach((obj) => this.extractCallbackCode(obj, this.userCode));

    new EventLoopHandler(this.callBacks, this.animationContainerClassNames);
  };
}

export default SubmitHandler;
