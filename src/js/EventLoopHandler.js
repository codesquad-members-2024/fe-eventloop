class EventLoopHandler {
  constructor(callBacks, classNames) {
    this.callBacks = callBacks;
    this.callStackClassName = classNames.callStackClassName;
    this.webApiClassName = classNames.webApiClassName;
    this.microQClassName = classNames.microQClassName;
    this.macroQClassName = classNames.macroQClassName;
    this.statusOfcallStack = [];
    this.statusOfWebApi = [];
    this.statusOfMicroQ = [];
    this.statusOfMacroQ = [];
    this.EventLoopControl();
  }

  // 애니메이션
  runAnimation() {}

  /**
   * macro Q가 비어있는지 확인
   * @returns true - macro Q가 비어있음
   * @returns false
   */
  checkIfMacroQIsEmpty() {
    return document.querySelector(this.macroQClassName).children.length === 0 ? true : false;
  }
  /**
   * micro Q가 비어있는지 확인
   * @returns true - micro Q가 비어있음
   * @returns false
   */
  checkIfMicroQIsEmpty() {
    return document.querySelector(this.microQClassName).children.length === 0 ? true : false;
  }
  /**
   * 콜스택이 비어있는지 확인
   * @returns true - 콜스택이 비어있음
   * @returns false
   */
  checkIfCallStackIsEmpty() {
    return document.querySelector(this.callStackClassName).children.length === 0 ? true : false;
  }

  removeMatchingElement(callBack, className) {
    const callStackTarget = document.querySelector(className);
    const stuffs = Array.from(callStackTarget.children);
    stuffs.forEach((stuff) => {
      if (stuff.textContent === callBack.callBackCode) {
        stuff.remove();
      }
    });
  }

  // 태그 지우기
  async removeElementByTextAsync(callBack, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.removeMatchingElement(callBack, className);
        this.updateStatusByClassName(callBack, className, 'pop');
        resolve(true);
      }, 2000);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        this.removeFirstElement(callBack, className);
        this.updateStatusByClassName(callBack, className, 'pop');
        resolve(true);
      }, 2000);
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

  getCallBackStatusByClassName(className) {
    if (className === this.callStackClassName) return this.statusOfcallStack[this.statusOfcallStack.length - 1];
    if (className === this.webApiClassName) return this.statusOfWebApi[this.statusOfWebApi.length - 1];
    if (className === this.microQClassName) return this.statusOfMicroQ[this.statusOfMicroQ.length - 1];
    if (className === this.macroQClassName) return this.statusOfMacroQ[this.statusOfMacroQ.length - 1];
  }

  updateStatusByClassName(callBack, className, type) {
    if (type === 'push') {
      if (className === this.callStackClassName) this.statusOfcallStack.push(callBack);
      if (className === this.webApiClassName) this.statusOfWebApi.push(callBack);
      if (className === this.microQClassName) this.statusOfMicroQ.push(callBack);
      if (className === this.macroQClassName) this.statusOfMacroQ.push(callBack);
    }
    if (type === 'pop') {
      if (className === this.callStackClassName) this.statusOfcallStack.pop(callBack);
      if (className === this.webApiClassName) this.statusOfWebApi.pop(callBack);
      if (className === this.microQClassName) this.statusOfMicroQ.pop(callBack);
      if (className === this.macroQClassName) this.statusOfMacroQ.pop(callBack);
    }
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
  }

  /** Promise.then, Promise.catch, Promise.finally, MutationObserver 콜백 */
  async setMicroTaskQueue(callBack, idx) {
    //마이크로 태스크 큐의 작업은 매크로 태스크보다 우선적으로 처리된다.
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webApiClassName);
    if (isElementRemoved) this.appendTag(callBack, this.microQClassName, idx);
  }

  /** setTimeout, setInterval, setImmediate, I/O 작업과 같은 비동기 작업의 콜백 */
  setMacroTaskQueue(callBack, idx) {
    setTimeout(async () => {
      const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webApiClassName);
      if (isElementRemoved) this.appendTag(callBack, this.macroQClassName, idx);
    }, callBack.delay);
  }

  classifyTaskQueues(callBack, idx) {
    if (callBack.type === 'then') this.setMicroTaskQueue(callBack, idx);
    if (callBack.type === 'catch') this.setMicroTaskQueue(callBack, idx);
    if (callBack.type === 'setTimeout') this.setMacroTaskQueue(callBack, idx);
  }

  async runEventLoop() {
    const IsEmpty = this.checkIfCallStackIsEmpty();

    if (IsEmpty) {
      const isMicroQIsEmpty = this.checkIfMicroQIsEmpty();
      const isMacroQIsEmpty = this.checkIfMacroQIsEmpty();
      if (isMicroQIsEmpty && isMacroQIsEmpty) return true;

      if (!isMicroQIsEmpty) {
        const microCallBackObj = this.getCallBackStatusByClassName(this.microQClassName);
        await this.removeFirstElementByTextAsync(this.microQClassName);
        this.appendTag(microCallBackObj, this.callStackClassName);
        return await this.removeElementByTextAsync(microCallBackObj, this.callStackClassName);
      }
      if (isMicroQIsEmpty && !isMacroQIsEmpty) {
        const macroCallBackObj = this.getCallBackStatusByClassName(this.macroQClassName);
        await this.removeFirstElementByTextAsync(this.macroQClassName);
        this.appendTag(macroCallBackObj, this.callStackClassName);
        return await this.removeElementByTextAsync(macroCallBackObj, this.callStackClassName);
      }
    }
  }

  async runEvent(callBack, idx) {
    //EVENT LOOP
    const isEventLoopSuccess = idx === 0 ? true : await this.runEventLoop();

    if (isEventLoopSuccess) {
      //CALL STACK
      this.appendTag(callBack, this.callStackClassName, idx);
      const isElementRemoved = await this.removeElementByTextAsync(callBack, this.callStackClassName);

      //WEB APIS
      if (isElementRemoved) this.appendTag(callBack, this.webApiClassName, idx);

      //MICRO & MACRO TASK QUEUE
      this.classifyTaskQueues(callBack, idx);

      //CALL STACK
      //EVENT LOOP
    }
  }

  // 콜스택 컨트롤
  async EventLoopControl() {
    console.log(this.callBacks);
    for (const [idx, callback] of this.callBacks.entries()) {
      await this.runEvent(callback, idx);
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
