const NO_ELEMENTS = 0;

class Observable {
  constructor() {
    this._observers = new Set();
  }

  subscribe(observer) {
    this._observers.add(observer);
  }

  unsubscribe(observer) {
    this._observers.delete(observer);
  }

  notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}

export class ComponentBox extends Observable {
  constructor(className) {
    super();
    this.className = className;
    this.components = [];
  }

  getClassName() {
    return this.className;
  }

  setComponents(components, maxLength) {
    this.components.length = NO_ELEMENTS;
    this.components = [...components];
    this.maxLength = maxLength;

    const contents = components.map((component) => component.toString())

    this.notify(this.className, contents, this.maxLength);
  }

  notify(className, contents, maxLength) {
    this._observers.forEach((observer) => observer({className, contents, maxLength}));
  }
}
