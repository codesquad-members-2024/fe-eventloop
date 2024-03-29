import { postData } from "./requestApi.js";

export function getCodeInput() {
  const runButton = document.querySelector(".submit-btn");

  runButton.addEventListener("click", () => {
    const code = document.getElementById("codeInput").value;
    postData("codeInput", code);
  });
}
