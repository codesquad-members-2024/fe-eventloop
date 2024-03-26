export default class SubmitHandler {
  constructor(formId, textId) {
    this.formId = formId;
    this.textId = textId;
    this.addEventHandler();
    this.fetchCall = null;
    this.thenCallbacks = [];
    this.setTimeoutCallback = null;
  }

  getCallbackCode(parseCode) {
    walk.simple(parseCode, {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'fetch') {
          info.fetchCall = node;
        } else if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'then') {
          info.thenCallbacks.push(node.arguments[0]);
        } else if (node.callee.type === 'Identifier' && node.callee.name === 'setTimeout') {
          info.setTimeoutCallback = node.arguments[0];
        }
      },
    });

    // console.log(info);
  }

  parseCode() {
    const userCodeTarget = document.getElementById(this.textId);
    const userCode = userCodeTarget.value;
    userCodeTarget.value = '';

    // console.log('제출된 코드:', userCode);

    const parseCode = acorn.parse(userCode, {
      sourceType: 'module',
    });

    return parseCode;
    // console.log(parseCode);
  }

  addEventHandler() {
    document.getElementById(this.formId).addEventListener('submit', this.handleFormSubmit);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const parseCode = this.parseCode();
    this.getCallbackCode(parseCode);
  };
}
