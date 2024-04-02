class EventLoopHandler {
  constructor(callBacks, classNames) {
    this.callBacks = callBacks;
    this.callStackClassName = classNames.callStackClassName;
    this.webAPIClassName = classNames.webApiClassName;
    this.microQClassName = classNames.microQClassName;
    this.macroQClassName = classNames.macroQClassName;
    this.status = {
      callStack: [],
      webAPI: [],
      microQ: [],
      macroQ: [],
    };
    this.classNameMap = {};
    this.setClassNameMap();
    this.EventLoopControl();
  }

  checkIfWebAPIIsEmpty() {
    return this.status.webAPI.length === 0;
  }

  checkIfMacroQIsEmpty() {
    return this.status.macroQ.length === 0;
  }

  checkIfMicroQIsEmpty() {
    return this.status.microQ.length === 0;
  }

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
    ElementTarget.children[0].remove();
  }

  async removeFirstElementByTextAsync(callBack, className) {
    await this.delay(2000);
    return new Promise((resolve) => {
      this.removeFirstElement(callBack, className);
      this.updateStatusByClassName(callBack, className, 'pop');
      resolve(true);
    });
  }

  generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 0x1000000).toString(16);
    return `#${'0'.repeat(6 - randomColor.length) + randomColor}`;
  }

  createAnimationDivMarkup(callBack, backgroundColor) {
    const newHTML = `<div class="animation__stuff" style="background-color: ${backgroundColor};">${callBack.callBackCode}</div>`;
    return newHTML;
  }

  specifyBackgroundColor(idx) {
    const isExistence = Object.prototype.hasOwnProperty.call(this.callBacks[idx], 'bgColor');
    if (isExistence) return this.callBacks[idx].bgColor;

    const backgroundColor = this.generateRandomColor();
    this.callBacks[idx].bgColor = backgroundColor;
    return backgroundColor;
  }

  setClassNameMap() {
    let classNameMap = new Map();
    classNameMap.set(this.callStackClassName, this.status.callStack);
    classNameMap.set(this.webAPIClassName, this.status.webAPI);
    classNameMap.set(this.microQClassName, this.status.microQ);
    classNameMap.set(this.macroQClassName, this.status.macroQ);
    this.classNameMap = classNameMap;
  }

  updateStatusByClassName(callBack, className, type) {
    if (type === 'push') this.classNameMap.get(className).push(callBack);
    if (type === 'pop') this.classNameMap.get(className).pop(callBack);
  }

  appendTag(callBack, className, idx) {
    const Target2append = document.querySelector(className);
    let backgroundColor = '#fffff';
    if (idx) backgroundColor = this.specifyBackgroundColor(idx);
    if (callBack.bgColor) backgroundColor = callBack.bgColor;

    const animationDivHtml = this.createAnimationDivMarkup(callBack, backgroundColor);
    Target2append.insertAdjacentHTML('beforeend', animationDivHtml);
    this.updateStatusByClassName(callBack, className, 'push');
  }

  async setMicroTaskQueue(callBack, idx) {
    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.webAPIClassName);
    if (isElementRemoved) this.appendTag(callBack, this.microQClassName, idx);
  }

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
      const isElementRemoved = await this.removeElementByTextAsync(statusObj, className);
      if (isElementRemoved) this.appendTag(statusObj, this.callStackClassName);
      await this.removeElementByTextAsync(statusObj, this.callStackClassName);
    }
  }

  async runEvent(callBack, idx) {
    this.appendTag(callBack, this.callStackClassName, idx);

    const isElementRemoved = await this.removeElementByTextAsync(callBack, this.callStackClassName);

    if (isElementRemoved) this.appendTag(callBack, this.webAPIClassName, idx);

    this.setTaskQueues(callBack, idx);

  }

  async EventLoopControl() {
    for (const [idx, callBack] of this.callBacks.entries()) {
      await this.runEvent(callBack, idx);
    }

    while (!this.checkIfMicroQIsEmpty() || !this.checkIfMacroQIsEmpty()) {
      await this.eventLoop('microQ', this.microQClassName);
      await this.eventLoop('macroQ', this.macroQClassName);
    }
  }
}

export default EventLoopHandler;