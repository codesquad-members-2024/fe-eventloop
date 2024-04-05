import {
  millisecondToSecond,
  delay,
  filterTasksByType,
  getFirstElementInArr,
} from './util.js';

test('2000이 2가 되어야함', () => {
  expect(millisecondToSecond(2000)).toBe(2);
});

test('2000이 2가 되어야함', () => {
  expect(getFirstElementInArr([10, 1, 2, 3, 4, 5])).toBe(10);
});
