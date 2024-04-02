export const selectorsMap = {
    formId: 'code-form',
    textId: 'code-input',
    callStackClassName: '.animation__call_stack_box',
    webAPIClassName: '.animation__web_api_box',
    microQClassName: '.animation__micro_task_box',
    macroQClassName: '.animation__macro_task_box',
} 

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));