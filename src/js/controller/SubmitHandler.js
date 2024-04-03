import { parseLiteral } from "../model/CodeParser.js";
import { controllEventLoop } from "../view/EventLoop.js";

export function handleSubmit() {
  const runButton = document.querySelector(".submit-btn");
  const inputArea = document.getElementById("codeInput");

  runButton.addEventListener("click", () => {
    const code = inputArea.value;
    parseLiteral(code)
      .then((callbacks) => controllEventLoop(callbacks));
  });
}