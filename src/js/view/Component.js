const INPUT_TITLE = "코드 입력";
const INPUT_PLACEHOLDER = "여기에 비동기 콜백이 포함된 코드를 입력하세요.";
const INPUT_SUBMIT = "동작시키기";

export const renderContainer = (className, content = '') => {
  return `<div class="${className}__container">${content}</div>`;
};

export const renderInputView = (className) => {
  const content = `
    <label class="${className}__title" for="code-block">${INPUT_TITLE}</label>
    <input class="${className}__text-input" type="text" name="code-block" placeholder="${INPUT_PLACEHOLDER}">
    <input class="${className}__submit" type="submit" value="${INPUT_SUBMIT}">
  `;

  return renderContainer(className, content);
};

export const renderComponentBox = (className, title, content = '') => {
  return `<div class="${className}__component-box">
    <span class="${className}__title">${title}</span>
    <div class="${className}__component-contents">${content}</div>
  </div>`;
}

export const renderComponent = (className, content = '') => {
  return `<div class="${className}__component">${content}</div>`;
}