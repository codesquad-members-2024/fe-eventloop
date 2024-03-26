function getAst() {
  const textareaValue = document.getElementById("enter-code").value;
  return acorn.parse(textareaValue, { ecmaVersion: 2020 });
}

function enterButtonClick() {
  const ast = getAst();
  console.log(ast);
}

function clickEvent() {
  const enterButton = document.querySelector(".enter-btn");
  enterButton.addEventListener("click", enterButtonClick);
}

export default clickEvent;
