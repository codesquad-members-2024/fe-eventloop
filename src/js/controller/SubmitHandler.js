import { parseLiteral } from "../model/CodeParser.js";
import { controllEventLoop } from "../view/EventLoop.js";

export async function handleSubmit() {
  const runButton = document.querySelector(".submit-btn");

  runButton.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    parseLiteral(code)
      .then((callbacks) => controllEventLoop(callbacks));
  });
}
