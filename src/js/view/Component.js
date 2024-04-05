import { updateGridComponents } from './GridView.js';
import { updateQueueComponents } from './QueueView.js';
import { updateStackComponents } from './StackView.js';
import { updateTutorialComponents } from './TutorialView.js';

const INPUT_TITLE = '코드 입력';
const INPUT_PLACEHOLDER = '여기에 비동기 콜백이 포함된 코드를 입력하세요.';
const INPUT_SUBMIT = '동작시키기';

const RENDER_TYPE = {
  'call-stack': updateStackComponents,
  'web-apis': updateGridComponents,
  'microtask-queue': updateQueueComponents,
  'macrotask-queue': updateQueueComponents,
  'tutorial': updateTutorialComponents,
};

export const renderContainer = ({ className, content = '' }) => {
  return `<div class="${className}__container">${content}</div>`;
};

export const renderInputView = (className) => {
  const content = `
    <label class="${className}__title" for="code-block">${INPUT_TITLE}</label>
    <textarea class="${className}__text-input" type="text" name="code-block" placeholder="${INPUT_PLACEHOLDER}"></textarea>
    <form>
        <input class="${className}__submit" type="submit" value="${INPUT_SUBMIT}">
    </form>
  `;

  return renderContainer({ className, content });
};

export const renderLoopIcon = ({ className, fillProperty }) => {
  return `<svg class="${className}__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M293.376 645.290667A256.085333 256.085333 0 0 0 753.408 597.333333h89.173333a341.461333 341.461333 0 0 1-610.816 109.568L128 810.666667v-256h256l-90.624 90.624z m437.290667-266.624A256.170667 256.170667 0 0 0 270.506667 426.666667H181.333333a341.546667 341.546667 0 0 1 610.986667-109.653334L896 213.333333v256h-256l90.666667-90.666666z" fill="${fillProperty}" />
  </svg>`;
};

export const renderComponent = ({ className, content = '', style = '' }) => {
  return `<div class="${className}__component" style="${style}">${content}</div>`;
};

export const renderBaseComponents = ({ contents, className, maxLength, condition }) => {
  return contents.reduce((acc, content, index) => {
    let component = renderComponent({ className, content });

    if (condition && condition(index, maxLength)) {
      component += renderComponent({ className, content });
    }
    return acc + component;
  }, '');
};

export const renderComponentBox = ({ className, title, content = '' }) => {
  return `<div class="${className}__component-box">
    <span class="${className}__title">${title}</span>
    <div class="${className}__component-content">${content}</div>
  </div>`;
};

export const updateComponentsOfView = ({ className, contents, maxLength }) => {
  const contentsTag = document.querySelector(`.${className}__component-content`);
  const components = RENDER_TYPE[className]({ className, contents, maxLength });

  contentsTag.innerHTML = components;
};

export const reverseGridComponents = (className) => {
  const componentContents = document.querySelector(`.${className}__components`);
  const components = [...componentContents.children];
  const componentCount = components.length;

  components.forEach((component, index) => (component.style.order = componentCount - index));
};

export const renderIndex = () => {
  const body = document.querySelector('body');
  const callStack = renderComponentBox({ className: 'call-stack', title: 'Call Stack' });
  const webApis = renderComponentBox({ className: 'web-apis', title: 'WEB APIs' });
  const loopIcon = renderLoopIcon({ className: 'event-loop', fillProperty: '#fff' });
  const eventLoop = renderComponentBox({ className: 'event-loop', title: 'Event Loop', content: loopIcon });
  const micro = renderComponentBox({ className: 'microtask-queue', title: 'Microtask Queue' });
  const macro = renderComponentBox({ className: 'macrotask-queue', title: 'Macrotask Queue' });
  const taskContainer = renderContainer({ className: 'task-queue', content: micro + macro });
  const tutorial = renderComponentBox({ className: 'tutorial', title: 'Show tutorial' });
  const execution = renderContainer({
    className: 'execution',
    content: callStack + webApis + eventLoop + taskContainer + tutorial,
  });

  body.innerHTML = renderInputView('input-view') + execution;
};
