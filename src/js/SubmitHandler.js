export default class SubmitHandler {
  constructor(formId, textId) {
    this.formId = formId;
    this.textId = textId;
    this.addEventHandler();
  }

  parseCode() {
    const userCodeTarget = document.getElementById(this.textId);
    const userCode = userCodeTarget.value;
    userCodeTarget.value = '';

    // console.log('제출된 코드:', userCode);

    const parseCode = acorn.parse(userCode, {
      sourceType: 'module',
    });

    // console.log(parseCode);
  }

  addEventHandler() {
    document.getElementById(this.formId).addEventListener('submit', this.handleFormSubmit);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.parseCode();
  };
}
