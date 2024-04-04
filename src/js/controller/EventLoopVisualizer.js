import { MACRO_TASK_PROTOTYPES, MICRO_TASK_PROTOTYPES, Macrotask, Microtask } from '../model/Callback.js';
import CodeAnalyzer from '../model/CodeAnalyzer.js';
import { ComponentBox } from '../model/ComponentBox.js';
import { reverseGridComponents, updateComponentsOfView } from '../view/Component.js';

const CLASS_NAME = {
  CALL_STACK: 'call-stack',
  WEB_APIS: 'web-apis',
  MICRO_TASK: 'microtask-queue',
  MACRO_TASK: 'macrotask-queue',
  TUTORIAL: 'tutorial',
};
const MAX_LENGTH = {
  CALL_STACK: 1,
  WEB_APIS: 7,
  MICRO_TASK: 3,
  MACRO_TASK: 3,
  TUTORIAL: 0,
};

const TUTORIAL_DESCRIPTION = {
  then: 'then의 callback이 [Microtask Queue]에 등록됩니다.',
  catch: 'catch의 callback이 [Microtask Queue]에 등록됩니다.',
  setTimeout: 'setTimeout의 callback이 [Macrotask Queue]에 등록됩니다.',
  callStack: '[Queue]에 있던 callback이 [CallStack]에 등록되어 실행됩니다.',
};

const ANIMATION_DELAY = 500;
const ANMIATON_DURATION = 2000;
const NO_ELEMENTS = 0;
const FIRST_INDEX = 0;

const isMicrotask = (callback) => Object.keys(MICRO_TASK_PROTOTYPES).includes(callback.calleeName);

const isMacrotask = (callback) => Object.keys(MACRO_TASK_PROTOTYPES).includes(callback.calleeName);

const setAnimationPlayState = (state) => {
  Object.values(CLASS_NAME).forEach((className) => {
    const componentsTag = document.querySelector(`.${className}__components`);

    if (componentsTag) componentsTag.style['animation-play-state'] = state;
  });
};

const startAnimation = () => setAnimationPlayState('running');

const transferFirstComponent = (source, target) => {
  const components = source.getComponents();
  if (components.length === NO_ELEMENTS) return false;

  const component = components.shift();
  target.setComponents([...target.getComponents(), component]);
  source.setComponents([...components]);
  return true;
};

export default class EventLoopVisualizer {
  inputArea = document.querySelector('.input-view__text-input');
  submitButton = document.querySelector('.input-view__submit');
  componentBox = {};
  animationInterval;

  constructor() {
    this.componentBox.callStack = new ComponentBox(CLASS_NAME.CALL_STACK, MAX_LENGTH.CALL_STACK);
    this.componentBox.webApis = new ComponentBox(CLASS_NAME.WEB_APIS, MAX_LENGTH.WEB_APIS);
    this.componentBox.microTasks = new ComponentBox(CLASS_NAME.MICRO_TASK, MAX_LENGTH.MICRO_TASK);
    this.componentBox.macroTasks = new ComponentBox(CLASS_NAME.MACRO_TASK, MAX_LENGTH.MACRO_TASK);
    this.componentBox.tutorial = new ComponentBox(CLASS_NAME.TUTORIAL, MAX_LENGTH.TUTORIAL, TUTORIAL_DESCRIPTION);
    this.codeAnalyzer = new CodeAnalyzer();
    this.initializeEventListener();
    this.initializeSubscribes();
  }

  handleSubmit(e) {
    const codeInput = this.inputArea.value;

    e.preventDefault();
    this.setCallbacks(codeInput);
  }

  initializeEventListener() {
    this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
  }

  initializeSubscribes() {
    const componentBoxList = Object.values(this.componentBox);

    //1. 생성한 객체들 돌면서 subscribe키에 updateComponents()함수 값 설정
    componentBoxList.forEach((box) => box.subscribe(updateComponentsOfView));
  }

  setCallbacks(code) {
    this.codeAnalyzer.initializeCallbacks(code);
    const callbacks = this.codeAnalyzer.getCallbacks();

    this.setComponents(callbacks);
  }

  setComponents(callbacks) {
    this.callbacks = callbacks.map((callback, index) => {
      if (isMicrotask(callback)) return new Microtask(callback.node, callback.calleeName, index);
      if (isMacrotask(callback)) return new Macrotask(callback.node, callback.calleeName, index);
    });

    this.componentBox.webApis.setComponents(this.callbacks);

    startAnimation();
    reverseGridComponents(CLASS_NAME.WEB_APIS);
    this.updateSchedule();
  }

  updateComponents() {
    const { callStack, webApis, microTasks, macroTasks, tutorial } = this.componentBox;
    const firstComponent = webApis.getComponents()[FIRST_INDEX];
    this.updateTutorial(tutorial, firstComponent);

    // 웹API -> 큐
    const isMicro = firstComponent && firstComponent instanceof Microtask && transferFirstComponent(webApis, microTasks);
    if (isMicro) return;
    const isMacro = firstComponent && firstComponent instanceof Microtask && transferFirstComponent(webApis, macroTasks);
    if (isMacro) return;

    // 큐 -> 콜스택
    const isFromMicroToCallStack = transferFirstComponent(microTasks, callStack);
    const isFromMacroToCallStack = transferFirstComponent(macroTasks, callStack);
    if (isFromMicroToCallStack || isFromMacroToCallStack) return;
  }

  updateTutorial(tutorial, firstComponent) {
    const tutorialTarget = document.querySelector('.tutorial__component-content');
    if (firstComponent) {
      tutorialTarget.innerHTML = tutorial.components[firstComponent.calleeName];
      return;
    }
    tutorialTarget.innerHTML = tutorial.components.callStack;
  }

  updateSchedule() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.interval = null;
    }

    this.animationInterval = setInterval(() => {
      setTimeout(startAnimation, ANIMATION_DELAY);
      this.updateComponents();
      reverseGridComponents(CLASS_NAME.WEB_APIS);
    }, ANMIATON_DURATION);
  }
}
