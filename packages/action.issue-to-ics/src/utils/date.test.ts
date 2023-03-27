import { getTimeArray } from './date';

describe('getTimeArray', () => {
  test('should convert date string to array with UTC values', () => {
    const dateString = '2023-03-28T14:30:00';
    const timezone = 'Asia/Seoul';
    const expectedArray = [2023, 3, 28, 5, 30];
    expect(getTimeArray(dateString, timezone)).toEqual(expectedArray);
  });

  test('should return UTC date array without timezone', () => {
    const dateString = '2023-03-28T14:30:00';
    const expectedArray = [2023, 3, 28, 14, 30];
    expect(getTimeArray(dateString)).toEqual(expectedArray);
  });

  test('should handle different date string formats', () => {
    const dateString1 = '2023-03-28T14:30';
    const dateString2 = '2023-03-28 14:30:00';
    const dateString3 = '2023-03-28';
    const timezone = 'Asia/Seoul';

    expect(getTimeArray(dateString1, timezone)).toEqual([2023, 3, 28, 5, 30]);
    expect(getTimeArray(dateString2, timezone)).toEqual([2023, 3, 28, 5, 30]);
    expect(getTimeArray(dateString3, timezone)).toEqual([2023, 3, 27, 15, 0]);
  });
});
