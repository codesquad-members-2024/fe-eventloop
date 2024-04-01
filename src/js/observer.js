export function CallStackObserver(elementId) {
  this.callStackElement = document.getElementById(elementId);

  this.update = function (callStack) {
    this.callStackElement.innerHTML = ''; // 현재 콜 스택 내용을 비웁니다.
    callStack.stack.forEach((task) => {
      const taskElement = document.createElement('span');
      taskElement.classList.add('task');
      taskElement.textContent = task; // 예시로, task가 문자열이라고 가정
      this.callStackElement.appendChild(taskElement);
    });
  };
}
