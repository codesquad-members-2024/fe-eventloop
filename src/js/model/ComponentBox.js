const NO_ELEMENTS = 0;
const DELAY = 1000;

export class Observable {
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
  constructor(className, pushAnimation, popAnimation) {
    super();
    this.className = className;
    this.components = [];
    this.pushAnimation = pushAnimation;
    this.popAnimation = popAnimation;
  }

  getClassName() {
    return this.className;
  }

  pushComponent(component) {
    this.components.push(component);

    const contents = this.components.map((component) => component.toString());

    this.notify(this.className, contents);
    if (this.pushAnimation) this.pushAnimation(this.className);
  }

  unshiftComponent() {
    if (this.popAnimation) this.popAnimation(this.className);
    const component = this.components.shift();

    const contents = this.components.map((component) => component.toString());

    setTimeout(() => {
      this.notify(this.className, contents);
    }, DELAY);
    return component;
  }

  getComponents() {
    return this.components;
  }

  notify(className, contents) {
    this._observers.forEach((observer) => observer({className, contents}));
  }

  clearComponents() {
    this.components.length = NO_ELEMENTS;
    this.notify(this.className, []);
  }
}