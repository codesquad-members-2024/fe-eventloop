export function getCodeInput() {
  const runButton = document.querySelector(".submit-btn");

  runButton.addEventListener("click", () => {
    const code = document.getElementById("codeInput").value;
    postData("codeInput", code);
  });
}

function postData(path, data) {
  fetch(`http://localhost:3000/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: data }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send code");
      }
      console.log("Code sent successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
