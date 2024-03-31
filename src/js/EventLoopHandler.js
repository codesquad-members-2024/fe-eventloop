class EventLoopHandler {
  constructor(callBacks, classNames) {
    this.callBacks = callBacks;
    this.callStackClassName = classNames.callStackClassName;
    this.webAPIClassName = classNames.webAPIClassName;
    this.microQClassName = classNames.microQClassName;
    this.macroQClassName = classNames.macroQClassName;
    this.status = {
      callStack: [],
      webAPI: [],
      microQ: [],
      macroQ: [],
    };
    this.classNameMap = {};
    this.setToclassNameMap();
    this.EventLoopControl();
  }

  // 애니메이션
  runAnimation() {}

  /**
   * macro Q가 비어있는지 확인
   * @returns true - macro Q가 비어있음
   * @returns false
   */
  checkIfWebAPIIsEmpty() {
    return this.status.webAPI.length === 0;
  }
  /**
   * macro Q가 비어있는지 확인
   * @returns true - macro Q가 비어있음
   * @returns false
   */
  checkIfMacroQIsEmpty() {
    return this.status.macroQ.length === 0;
  }
  /**
   * micro Q가 비어있는지 확인
   * @returns true - micro Q가 비어있음
   * @returns false
   */
  checkIfMicroQIsEmpty() {
    return this.status.microQ.length === 0;
  }
  /**
   * 콜스택이 비어있는지 확인
   * @returns true - 콜스택이 비어있음
   * @returns false
   */
  checkIfCallStackIsEmpty() {
    return this.status.callStack.length === 0;
  }

  removeMatchingElement(callBack, className) {
    const callStackTarget = document.querySelector(className);

    this.classNameMap.get(className).pop();

    const stuffs = Array.from(callStackTarget.children);
    stuffs.forEach((stuff) => {
      if (stuff.textContent === callBack.callBackCode) {
        stuff.remove();
      }
    });
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 태그 지우기
  async removeElementByTextAsync(callBack, className) {
    await this.delay(2000);
    return new Promise((resolve) => {
      this.removeMatchingElement(callBack, className);
      this.updateStatusByClassName(callBack, className, 'pop');
      resolve(true);
    });
  }

  removeFirstElement(className) {
    const ElementTarget = document.querySelector(className);
    if (ElementTarget.children.length > 0) {
      ElementTarget.children[0].remove(); // 첫 번째 자식 요소 제거
    }
  }

  // 첫번째 태그 지우기
  async removeFirstElementByTextAsync(callBack, className) {
    await this.delay(2000);
    return new Promise((resolve) => {
      this.removeFirstElement(callBack, className);
      this.updateStatusByClassName(callBack, className, 'pop');
      resolve(true);
    });
  }

  // 랜덤 색상
  generateRandomColor() {
    // 0x1000000 (16777216)보다 작은 랜덤 정수를 생성하고, 16진수 문자열로 변환
    const randomColor = Math.floor(Math.random() * 0x1000000).toString(16);
    // 색상 코드가 항상 6자리가 되도록 앞에 0을 붙임
    return `#${'0'.repeat(6 - randomColor.length) + randomColor}`;
  }

  // 태그 생성
  createAnimationDivMarkup(callBack, backgroundColor) {
    const newHTML = `<div class="animation__stuff" style="background-color: ${backgroundColor};">${callBack.callBackCode}</div>`;
    return newHTML;
  }

  specifyBackgroundColor(idx) {
    // if (this.bgColor.hasOwnProperty(typeName)) {
    // 위의 경우는 hasOwnProperty 메서드가 오버라이드되었거나, this.bgColor 객체가 null 또는 undefined인 경우에는 오류가 발생할 수 있습니다.
    const isExistence = Object.prototype.hasOwnProperty.call(this.callBacks[idx], 'bgColor');
    if (isExistence) return this.callBacks[idx].bgColor;

    const backgroundColor = this.generateRandomColor();
    this.callBacks[idx].bgColor = backgroundColor;
    return backgroundColor;
  }

  setToclassNameMap() {
    let classNameMap = new Map();
    classNameMap.set(this.callStackClassName, this.status.callStack);
    classNameMap.set(this.webAPIClassName, this.status.webAPI);
    classNameMap.set(this.microQClassName, this.status.microQ);
    classNameMap.set(this.macroQClassName, this.status.macroQ);
    this.classNameMap = classNameMap;
  }

  getCallBackStatusByClassName(className) {
    const statusArray = this.classNameMap.get(className);
    if (statusArray && statusArray.length > 0) {
      return statusArray[statusArray.length - 1];
    }
  }

  updateStatusByClassName(callBack, className, type) {
    if (type === 'push') this.classNameMap.get(className).push(callBack);
    if (type === 'pop') this.classNameMap.get(className).pop(callBack);
  }

  // 태그 생성
  appendTag(callBack, className, idx) {
    const Target2append = document.querySelector(className);
    let backgroundColor = '#fffff';
    if (idx) backgroundColor = this.specifyBackgroundColor(idx);
    if (callBack.bgColor) backgroundColor = callBack.bgColor;

    const animationDivHtml = this.createAnimationDivMarkup(callBack, backgroundColor);
    Target2append.insertAdjacentHTML('beforeend', animationDivHtml);
    this.updateStatusByClassName(callBack, className, 'push');
    this.updateStatusByClassName(callBack, className, 'push');
  }

  /** Promise.then, Promise.catch, Promise.finally, MutationObserver 콜백 */
  async setMicroTaskQueue(callBack, idx) {
    //마이크로 태스크 큐의 작업은 매크로 태스크보다 우선적으로 처리된다.
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webAPIClassName);
    if (isElementRemoved) this.appendTag(callBack, this.microQClassName, idx);
  }

  /** setTimeout, setInterval, setImmediate, I/O 작업과 같은 비동기 작업의 콜백 */
  setMacroTaskQueue(callBack, idx) {
    setTimeout(async () => {
      const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webAPIClassName);
      if (isElementRemoved) this.appendTag(callBack, this.macroQClassName, idx);
    }, callBack.delay);
  }

  setTaskQueues(callBack, idx) {
    if (callBack.type === 'then' || callBack.type === 'catch') this.setMicroTaskQueue(callBack, idx);
    if (callBack.type === 'setTimeout') this.setMacroTaskQueue(callBack, idx);
  }

  async eventLoop(queueName, className) {
    if (this.status.callStack.length === 0 && this.status[queueName].length !== 0) {
      const statusObj = this.status[queueName][this.status[queueName].length - 1];
      // 큐에서 지우기
      const isElementRemoved = await this.removeElementByTextAsync(statusObj, className);
      // 스택에 추가하기
      if (isElementRemoved) this.appendTag(statusObj, this.callStackClassName);
      // 스택에서 지우기
      await this.removeElementByTextAsync(statusObj, this.callStackClassName);
    }
  }

  async runEvent(callBack, idx) {
    //CALL STACK
    this.appendTag(callBack, this.callStackClassName, idx);

    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.callStackClassName);

    //WEB APIS
    if (isElementRemoved) this.appendTag(callBack, this.webAPIClassName, idx);

    //MICRO & MACRO TASK QUEUE
    this.setTaskQueues(callBack, idx);

    // const isEmptyWebAPI = this.checkIfWebAPIIsEmpty();
    // const isEmptyMicroQ = this.checkIfMicroQIsEmpty();
    // const isEmptyMacroQ = this.checkIfMacroQIsEmpty();
    // while (!this.checkIfWebAPIIsEmpty() || !this.checkIfMicroQIsEmpty() || !this.checkIfMacroQIsEmpty()) {
    while (!this.checkIfMicroQIsEmpty() || !this.checkIfMacroQIsEmpty()) {
      await this.eventLoop('microQ', this.microQClassName);
      await this.eventLoop('macroQ', this.macroQClassName);
    }
  }

  // 콜스택 컨트롤
  async EventLoopControl() {
    // console.log(this.callBacks);

    for (const [idx, callBack] of this.callBacks.entries()) {
      await this.runEvent(callBack, idx);
    }

    while (!this.checkIfMicroQIsEmpty() || !this.checkIfMacroQIsEmpty()) {
      await this.eventLoop('microQ', this.microQClassName);
      await this.eventLoop('macroQ', this.macroQClassName);
    }
  }
}
/**
 * 1. 콜백들 중 하나 받아와
 * 2. call stack에 올려 태그 생겨 -> 2초뒤 사라져
 * 3. web API로 우측으로 이동해 -> 바로 생겨 -> 사라져
 * 4. micro/macro task queue중 어디로 갈지 파악하고 이동해
 * 5.
 * 
 * Task Queue 
    : 일반적으로 '매크로 태스크 큐'라고도 불린다.
      setTimeout, setInterval, setImmediate, I/O 작업과 같은 비동기 작업의 콜백이 위치하는 큐다.
      이벤트 루프가 Task Queue의 작업을 하나씩 콜 스택으로 이동시켜 처리한다.
    
    Microtask Queue
    : Promise.then, Promise.catch, Promise.finally, MutationObserver 콜백이 위치하는 큐다.
      마이크로 태스크 큐의 작업은 매크로 태스크보다 우선적으로 처리된다.
 * 
 */

export default EventLoopHandler;
