export async function getData(path) {
  const data = await fetch(`http://localhost:3000/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get code");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return data;
}

export function postData(path, data) {
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
