import { isFirstIndex, isEven, isLastIndex, isToCopy } from './GridView.js';

// given(테스트에 필요한 값 셋팅) -> when(실행) -> then(테스트)
describe('gridView - Boolean 관련 테스트', function () {
  '인덱스 값이 첫번째 인덱스 값일 때 true를 반환',
    function () {
      // *given
      const index = 0;

      // *when
      const result = isFirstIndex(index);

      // *then
      expect(result).toBeTruthy();
    };

  test.each(['0', 1, undefined, null])('인덱스 값이 invalid한 값일 때 false를 반환', (input) => {
    // given input

    // when
    const result = isFirstIndex(input);

    // then
    expect(result).toBe(false);
  });

  test("인덱스 값이 문자열 '0' 값일 때 false를 반환", function () {
    // *given
    const index = '0';

    // *when
    const result = isFirstIndex(index);

    // *then
    expect(undefined).toBeFalsy(); //tobe(false)
  });
});
