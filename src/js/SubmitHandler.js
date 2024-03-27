import EventLoopHandler from './EventLoopHandler.js';

export default class SubmitHandler {
  constructor(formId, textId) {
    this.formId = formId;
    this.textId = textId;
    this.addEventHandler();
    this.userCode = '';
    // this.callBackCodeInfo = {
    //   fetchCalls: [],
    //   thenCallbacks: [],
    //   catchCallbacks: [],
    //   setTimeoutCallbacks: [],
    // };
    this.callBacks = [];
  }

  extractCallbackCode(parseNode, originalCode) {
    // console.log(parseNode);

    if (parseNode.type === 'CallExpression') {
      const callee = parseNode.callee;
      let extractCode = originalCode.substring(parseNode.start, parseNode.end);
      let asyncOp = null;

      // .then, .catch, setTimeout의 콜백 파악
      if (callee.type === 'MemberExpression' && callee.property.name === 'then') {
        // console.log('💥then');
        // this.callBackCodeInfo.thenCallbacks.push(parseNode.arguments[0]);
        const thenCallCode = originalCode.substring(parseNode.arguments[0].body.start, parseNode.arguments[0].body.end);
        asyncOp = {
          type: 'then',
          callBackCode: thenCallCode,
          node: parseNode.arguments[0],
        };
      }

      if (callee.type === 'MemberExpression' && callee.property.name === 'catch') {
        // console.log('💥catch');
        // this.callBackCodeInfo.catchCallbacks.push(parseNode.arguments[0]);
        const catchCallCode = originalCode.substring(parseNode.arguments[0].body.start, parseNode.arguments[0].body.end);
        asyncOp = {
          type: 'catch',
          callBackCode: catchCallCode,
          node: parseNode.arguments[0],
        };
      }

      if (callee.type === 'Identifier' && callee.name === 'setTimeout') {
        // console.log('💥setTimeout');
        const callBackCode = originalCode.substring(parseNode.arguments[0].body.body[0].start, parseNode.arguments[0].body.body[0].end);
        const delay = parseNode.arguments[1].value; // setTimeout의 지연 시간
        // this.callBackCodeInfo.setTimeoutCallbacks.push(parseNode.arguments[0]);
        asyncOp = {
          type: 'setTimeout',
          callBackCode,
          delay,
          node: parseNode.arguments[0],
        };
      }

      if (asyncOp) {
        this.callBacks.unshift(asyncOp);
      }
    }

    // 재귀적으로 자식 노드 순회
    Object.keys(parseNode).forEach((key) => {
      //*1)
      if (parseNode.hasOwnProperty(key)) {
        const child = parseNode[key];
        if (typeof child === 'object' && child !== null) {
          this.extractCallbackCode(child, originalCode);
        }
      }
    });
  }

  parseCode() {
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
    const parseCode = this.parseCode();
    this.extractCallbackCode(parseCode, this.userCode);

    new EventLoopHandler(this.callBacks);
  };
}

/**
 * *1)
 * 객체에 해당 key로 명시된 속성이 직접적으로 정의되어 있는지를 확인하기 위함입니다.
 * 이 방법은 속성이 존재하지 않는 것과 속성의 값이 "falsy"인 것(예: false, 0, "", null, undefined, NaN) 사이의 차이를 명확하게 구분합니다.
 * 속성의 값과 관계없이, 속성의 존재 자체만을 확인합니다. 따라서, 해당 속성이 "falsy" 값을 가지고 있더라도, 속성이 객체에 직접 정의되어 있다면 true를 반환합니다.
 *
 * if (parseNode[key])와 같은 조건문은 속성의 값이 "truthy"인지 여부를 검사하므로, 속성의 존재 여부와는 관계없이 속성의 값에 따라 조건문이 실행됩니다.
 * 속성의 존재 여부만을 명확히 확인하고자 할 때는 hasOwnProperty를 사용하는 것이 적합합니다.
 * 
 *  < 필요한 정보 >
     fetch
        : CallExpression 노드에서 callee가 fetch인 경우
     .then / .catch의 콜백 함수
        : CallExpression에서 callee의 property가 then 또는 catch인 경우를 찾고, 해당 arguments에서 콜백 함수를 추출
     setTimeout의 콜백 함수
        : CallExpression 노드에서 callee가 setTimeout인 경우를 찾고, arguments의 두 번째 요소(콜백 함수)를 추출
 * 
    Task Queue 
    : 일반적으로 '매크로 태스크 큐'라고도 불린다.
      setTimeout, setInterval, setImmediate, I/O 작업과 같은 비동기 작업의 콜백이 위치하는 큐다.
      이벤트 루프가 Task Queue의 작업을 하나씩 콜 스택으로 이동시켜 처리한다.
    
    Microtask Queue
    : Promise.then, Promise.catch, Promise.finally, MutationObserver 콜백이 위치하는 큐다.
      마이크로 태스크 큐의 작업은 매크로 태스크보다 우선적으로 처리된다.
 */
