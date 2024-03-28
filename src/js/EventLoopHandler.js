export default class EventLoopHandler {
  constructor(callBacks, classNames) {
    this.callStackClassName = classNames.callStackClassName;
    this.webApiClassName = classNames.webApiClassName;
    this.microQClassName = classNames.microQClassName;
    this.macroQClassName = classNames.macroQClassName;
    this.callBacks = callBacks;
    this.EventLoopControl();
  }

  // 애니메이션
  runAnimation() {}

  // 태그 지우기
  async removeElementByTextAsync(callBack, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const callStackTarget = document.querySelector(className);
        const stuffs = Array.from(callStackTarget.children);
        stuffs.forEach((stuff) => {
          if (stuff.textContent === callBack.callBackCode) {
            stuff.remove();
          }
        });
        resolve(true);
      }, 5000);
    });
  }

  // 태그 생성
  createAnimationDivMarkup(callBack) {
    const newHTML = `<div class="animation__stuff">${callBack.callBackCode}</div>`;
    return newHTML;
  }

  // 태그 생성
  appendTag(callBack, className) {
    const Target2append = document.querySelector(className);
    const animationDivHtml = this.createAnimationDivMarkup(callBack);
    Target2append.insertAdjacentHTML('beforeend', animationDivHtml);
  }

  /** Promise.then, Promise.catch, Promise.finally, MutationObserver 콜백 */
  async setMicroTaskQueue(callBack) {
    //마이크로 태스크 큐의 작업은 매크로 태스크보다 우선적으로 처리된다.
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webApiClassName);
    if (isElementRemoved) this.appendTag(callBack, this.microQClassName);
  }

  /** setTimeout, setInterval, setImmediate, I/O 작업과 같은 비동기 작업의 콜백 */
  setMacroTaskQueue(callBack) {
    setTimeout(async () => {
      const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webApiClassName);
      if (isElementRemoved) this.appendTag(callBack, this.macroQClassName);
    }, callBack.delay);
  }

  classifyTaskQueues(callBack) {
    if (callBack.type === 'then') this.setMicroTaskQueue(callBack);
    if (callBack.type === 'catch') this.setMicroTaskQueue(callBack);
    if (callBack.type === 'setTimeout') this.setMacroTaskQueue(callBack);
  }

  async runEvent(callBack) {
    //CALL STACK
    this.appendTag(callBack, this.callStackClassName);
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.callStackClassName);

    //WEB APIS
    if (isElementRemoved) this.appendTag(callBack, this.webApiClassName);

    //MICRO & MACRO TASK QUEUE
    this.classifyTaskQueues(callBack);
  }

  // 콜스택 컨트롤
  async EventLoopControl() {
    for (const callback of this.callBacks) {
      await this.runEvent(callback);
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
