import acorn from "acorn";
import { AsyncFunctionParser } from "./CodeParser";

describe("CodeParser Integration Test", () => {
  test("예제 코드의 callee.name과 파싱한 calleeName이 일치하는지 검증", () => {
    // given
    const code = `fetch('https://api.example.com/data', {
method: 'GET',
headers: {
  'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There was a problem with your fetch operation:', error));
  
setTimeout(function() {
  alert('This message is shown after 3 seconds');
}, 3000);`;
    const options = { ecmaVersion: "latest" };
    const ast = acorn.parse(code, options);
    const expectedCalleeNames = ["then", "then", "catch", "setTimeout"];

    // when
    const parser = new AsyncFunctionParser(code, ast);
    const callbacks = parser.getCallbacks();

    // then
    callbacks.forEach((callback, index) => expect(callback.calleeName).toBe(expectedCalleeNames[index]));
  });
});