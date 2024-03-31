import SubmitHandler from './SubmitHandler.js';

const formId = 'code-form';
const textId = 'code-input';
const animationContainerClassNames = {
  callStackClassName: '.animation__call_stack_box',
  webAPIClassName: '.animation__web_api_box',
  microQClassName: '.animation__micro_task_box',
  macroQClassName: '.animation__macro_task_box',
};

new SubmitHandler(formId, textId, animationContainerClassNames);
