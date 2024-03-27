export default class EventLoopHandler {
  constructor(callBacks) {
    this.callStackClassName = '.animation__call_stack_box';
    this.webApiClassName = '.animation__web_api_box';
    this.callBacks = callBacks;
    this.EventLoopControl();
  }

  // 애니메이션
  runAnimation() {}

  // 태그 지우기
  async removeHTML(callBack, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const callStackTarget = document.querySelector(className);
        const stuffs = Array.from(callStackTarget.children);
        stuffs.forEach((stuff) => {
          if (stuff.textContent === callBack.callBackCode) {
            stuff.remove();
            // console.log('-------------삭제--------------');
          }
        });
        resolve(true);
      }, 5000);
    });
  }

  // 태그 생성
  createHTML(callBack) {
    const newHTML = `<div class="animation__stuff">${callBack.callBackCode}</div>`;
    return newHTML;
  }

  // 태그 생성
  appendTag(callBack, className) {
    const Target2append = document.querySelector(className);
    const createHTML = this.createHTML(callBack);
    Target2append.insertAdjacentHTML('beforeend', createHTML);
    // console.log('-------------생성--------------');
  }

  classifyTaskQueues() {}

  async runEvent(callBack) {
    this.appendTag(callBack, this.callStackClassName);
    // this.runAnimation()
    const callBackRemove = await this.removeHTML(callBack, this.callStackClassName);

    if (callBackRemove) this.appendTag(callBack, this.webApiClassName);
    const webApiRemove = await this.removeHTML(callBack, this.webApiClassName);

    if (webApiRemove) this.classifyTaskQueues(callBack);
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
 */
