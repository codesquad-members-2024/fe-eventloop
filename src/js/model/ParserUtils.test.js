import parserUtils from "./ParserUtils";

describe("isEmpty 단위 테스트", () => {
  test("배열의 길이가 0일 때 true를 반환", () => {
    // given
    const input = [];

    // when
    const result = parserUtils.isEmpty(input);

    // then
    expect(result).toBeTruthy();
  });
  
  test.each([
    undefined,
    null,
    "",
    0,
    {},
    BigInt(Number.MAX_SAFE_INTEGER),
    Symbol("foo"),
  ])('입력된 값이 배열이 아닐 때 false를 반환', (input) => {
    // given input

    // when
    const result = parserUtils.isEmpty(input);

    // then
    expect(result).toBeFalsy();
  });

  test.each([
    [1],
    [1, 2],
    [1, 2, 3],
  ])('입력된 배열의 길이가 0보다 클 때 false를 반환', (input) => {
    // given input

    // when
    const result = parserUtils.isEmpty(input);

    // then
    expect(result).toBeFalsy();
  });
});

describe("isObjectType 단위 테스트", () => {
  test.each([
    undefined,
    null,
    0,
    "string",
    BigInt(Number.MAX_SAFE_INTEGER),
    Symbol("foo"),

  ])("입력된 값이 Object 타입이 아니면 false를 반환", (input) => {
    // given input

    // when
    const result = parserUtils.isObjectType(input);

    // then
    expect(result).toBeFalsy();
  });

  test.each([
    { node: {} },
    [{ node: {} }],
    [1, "2"],
    [],
    {}
  ])("입력된 값이 Object 타입이면 true를 반환", (input) => {
    // given input

    // when
    const result = parserUtils.isObjectType(input);

    // then
    expect(result).toBeTruthy();
  });
});