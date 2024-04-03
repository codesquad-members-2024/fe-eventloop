import { isFirstIndex, isEven, isLastIndex, isToCopy } from './GridView.js';

describe('gridView - isFirstIndex 단위 테스트', () => {
  test('첫번째 인덱스 값일 때 true를 반환', () => {
    // given
    const input = 0;
    // when
    const result = isFirstIndex(input);
    // then
    expect(result).toBe(true);
  });

  test('첫번째 인덱스 값이 아닐 때 false를 반환', () => {
    // given
    const input = 1;
    // when
    const result = isFirstIndex(input);
    // then
    expect(result).toBe(false);
  });

  test('유효하지 않은 값(undefined)일 때 false를 반환', () => {
    // given
    const input = undefined;
    // when
    const result = isFirstIndex(input);
    // then
    expect(result).toBe(false);
  });

  test('유효하지 않은 값(null)일 때 false를 반환', () => {
    // given
    const input = null;
    // when
    const result = isFirstIndex(input);
    // then
    expect(result).toBe(false);
  });

  test("문자열 '0'일 때 false를 반환", () => {
    // given
    const input = '0';
    // when
    const result = isFirstIndex(input);
    // then
    expect(result).toBe(false);
  });
});

describe('gridView - isEven 단위 테스트', () => {
  test('짝수이면 true를 반환', () => {
    // given
    const input = 0;
    // when
    const result = isEven(input);
    // then
    expect(result).toBe(true);
  });

  test('짝수가 아니면 false를 반환', () => {
    // given
    const input = 1;
    // when
    const result = isEven(input);
    // then
    expect(result).toBe(false);
  });

  test('유효하지 않은 값(undefined)일 때 false를 반환', () => {
    // given
    const input = undefined;
    // when
    const result = isEven(input);
    // then
    expect(result).toBe(false);
  });

  test('유효하지 않은 값(null)일 때 false를 반환', () => {
    // given
    const input = null;
    // when
    const result = isEven(input);
    // then
    expect(result).toBe(false);
  });

  test("문자열 '0'일 때 false를 반환", () => {
    // given
    const input = '0';
    // when
    const result = isEven(input);
    // then
    expect(result).toBe(false);
  });
});

describe('gridView - isLastIndex 단위 테스트', () => {
  test('마지막 인덱스일 때 true를 반환', () => {
    // given
    const [index, maxLength] = [2, 3];
    // when
    const result = isLastIndex(index, maxLength);
    // then
    expect(result).toBe(true);
  });

  test('마지막 인덱스가 아닐 때 false를 반환', () => {
    // given
    const [index, maxLength] = [1, 3];
    // when
    const result = isLastIndex(index, maxLength);
    // then
    expect(result).toBe(false);
  });
});

describe('gridView - isToCopy 단위 테스트', () => {
  test('첫번째 인덱스, 마지막 인덱스가 아니고 짝수일 때 true를 반환', () => {
    // given
    const [index, maxLength] = [2, 4];
    // when
    const result = isToCopy(index, maxLength);
    // then
    expect(result).toBe(true);
  });

  test.each([
    ['index값이 undefined', undefined, 3],
    ['maxLength값이 undefined', 1, undefined],
    ['index값이 null', null, 3],
    ['maxLength값이 null', 1, null],
    ['index값이 string', '1', 3],
    ['maxLength값이 string', 1, '3'],
  ])('invalid한 값(%s)일 때 false를 반환', (description, index, maxLength) => {
    // given input
    // when
    const result = isToCopy(index, maxLength);
    // then
    expect(result).toBe(false);
  });
});
