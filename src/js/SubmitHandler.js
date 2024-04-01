import { parseLiteral } from "./CodeParser.js";
import { controllEventLoop } from "./EventLoop.js";

export async function handleSubmit() {
  const runButton = document.querySelector(".submit-btn");

  runButton.addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const callbacks = await parseLiteral(code).then((resolve) => resolve);
    controllEventLoop(callbacks);
  });
}
