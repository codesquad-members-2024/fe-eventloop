import SubmitHandler from './SubmitHandler.js';

const formId = 'code-form';
const textId = 'code-input';

window.onload = () => {
  new SubmitHandler(formId, textId);
};
