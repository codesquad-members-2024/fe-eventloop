import { Callback, Macrotask, Microtask, replaceCallbackBody } from "./Callback";

describe("replaceCallbackBody 단위 테스트", () => {
  test.each([
    ["x => console.log(x)", "x => ..."],
    ["x => { console.log(x) }", "x => {...}"],
    ["function() { console.log('hi') }", "function() {...}"],
  ])("함수 본문이 올바르게 ...으로 대체되는지 확인", (input, expected) => {
    // given input, expected

    // when
    const result = replaceCallbackBody(input);

    // then
    expect(result).toBe(expected);
  });

  test.each([
    "let x = 10;",
    "",
    null,
    undefined
  ])("콜백 함수를 인식하지 못할시 에러를 반환", (input) => {
    // given input

    // when & then
    expect(() => replaceCallbackBody(input)).toThrow(Error);
  });
});

describe("Callback 클래스 단위 테스트", () => {
  test("getCalleeName이 calleeName을 반환하는지 확인", () => {
    // given
    const asyncFn = "() => { console.log('hi') }";
    const calleeName = "then";
    const callback = new Callback(asyncFn, calleeName);

    // when
    const result = callback.getCalleeName();

    // then
    expect(result).toEqual(calleeName);
  });
});

describe("Microtask 클래스 단위 테스트", () => {
  test("toString이 올바른 문자열을 반환하는지 확인", () => {
    // given
    const codeBlock = "x => x";
    const calleeName = "then";
    const microtask = new Microtask(codeBlock, calleeName);
    const expected = `<pre>Promise.then : x => ...</pre>`

    // when
    const result = microtask.toString();

    // then
    expect(result).toEqual(expected);
  });
});

describe("Macrotask 클래스 단위 테스트", () => {
  test("toString이 올바른 문자열을 반환하는지 확인", () => {
    // given
    const codeBlock = "() => { console.log('hi') }";
    const calleeName = "setTimeout";
    const macrotask = new Macrotask(codeBlock, calleeName);
    const expected = `<pre>Window.setTimeout : () => {...}</pre>`

    // when
    const result = macrotask.toString();

    // then
    expect(result).toEqual(expected);
  });
});