export default class EventLoopHandler {
  constructor(callBacks, classNames) {
    this.callBacks = callBacks;
    this.callStackClassName = classNames.callStackClassName;
    this.webApiClassName = classNames.webApiClassName;
    this.microQClassName = classNames.microQClassName;
    this.macroQClassName = classNames.macroQClassName;
    this.EventLoopControl();
  }

  // 애니메이션
  runAnimation() {}

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

  // 태그 생성
  appendTag(callBack, className, idx) {
    const Target2append = document.querySelector(className);

    let backgroundColor = this.specifyBackgroundColor(idx);
    const animationDivHtml = this.createAnimationDivMarkup(callBack, backgroundColor);
    Target2append.insertAdjacentHTML('beforeend', animationDivHtml);
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

  async runEvent(callBack, idx) {
    //CALL STACK
    this.appendTag(callBack, this.callStackClassName, idx);
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.callStackClassName);

    //WEB APIS
    if (isElementRemoved) this.appendTag(callBack, this.webApiClassName, idx);

    //MICRO & MACRO TASK QUEUE
    this.classifyTaskQueues(callBack, idx);
    //CALL STACK
    const IsEmpty = this.checkIfCallStackIsEmpty();
    // if(IsEmpty) setMicroTaskQueue 다 빼내고, setMacroTaskQueue를 뺀다.\
  }

  // 콜스택 컨트롤
  async EventLoopControl() {
    for (const [idx, callback] of this.callBacks.entries()) {
      await this.runEvent(callback, idx);
    }
    // this.callBacks.forEach((callBack) => {
    // });
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
