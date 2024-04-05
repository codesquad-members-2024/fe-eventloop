import acorn from "acorn";
import { AsyncFunctionParser } from "./CodeParser";
import parserUtils from "./ParserUtils";

describe("CodeParser 테스트", () => {
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
  let ast;
  let parser;

  beforeEach(() => {
    ast = acorn.parse(code, options);
    parser = new AsyncFunctionParser(code, ast);
  });

  test("예제 코드의 callee.name과 파싱한 calleeName이 일치하는지 검증", () => {
    // given
    const expectedCalleeNames = ["then", "then", "catch", "setTimeout"];

    // when
    const callbacks = parser.getCallbacks();

    // then
    callbacks.forEach((callback, index) => expect(callback.calleeName).toBe(expectedCalleeNames[index]));
  });

  test("findAsyncFunctions가 예제 코드에서 알맞은 노드와 수를 파싱하는지 검증", () => {
    // given before

    // when
    const result = parser.findAsyncFunctions(ast);
    const containsOnlyNode = result.every((node) => parserUtils.isObjectType(node));

    // then
    expect(result).toHaveLength(4);
    expect(containsOnlyNode).toBe(true);
  });

  test("extractCallbacks가 예제 코드에서 알맞은 calleeName과 예제 코드의 부분을 파싱하는지 확인", () => {
    // given
    const asyncNodes = parser.findAsyncFunctions(ast);
    const expectedCalleeNames = ["then", "then", "catch", "setTimeout"];

    // when
    const result = parser.extractCallbacks(asyncNodes);

    // then
    result.forEach((callback, index) => {
      expect(callback.calleeName).toEqual(expectedCalleeNames[index]);
      expect(code.includes(callback.code)).toBe(true);
    });
  });
});
