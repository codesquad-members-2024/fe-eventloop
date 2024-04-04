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
  constructor(className, maxLength, components = []) {
    super();
    this.className = className;
    this.maxLength = maxLength;
    this.components = components;
  }

  getClassName() {
    return this.className;
  }

  setComponents(components) {
    this.components.length = NO_ELEMENTS;
    this.components = [...components];

    const contents = components.map((component) => component.toString());

    this.notify(this.className, contents, this.maxLength);
  }

  getComponents() {
    return this.components;
  }

  notify(className, contents, maxLength) {
    this._observers.forEach((observer) => observer({ className, contents, maxLength }));
  }
}
