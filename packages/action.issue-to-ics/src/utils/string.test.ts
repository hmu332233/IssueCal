import { stringToObject } from './string';

describe('stringToObject', () => {
  test('should convert string to object', () => {
    const input = 'a: 1\nb: 2\n\nc: 3';
    const expectedOutput = { a: '1', b: '2', c: '3' };
    expect(stringToObject(input)).toEqual(expectedOutput);
  });

  test('should handle empty input', () => {
    const input = '';
    const expectedOutput = {};
    expect(stringToObject(input)).toEqual(expectedOutput);
  });

  test('should handle input with only empty lines', () => {
    const input = '\n\n';
    const expectedOutput = {};
    expect(stringToObject(input)).toEqual(expectedOutput);
  });

  test('should handle input with spaces and tabs', () => {
    const input = ' a : 1 \n\tb\t:\t2\t\n\nc :3';
    const expectedOutput = { a: '1', b: '2', c: '3' };
    expect(stringToObject(input)).toEqual(expectedOutput);
  });
});
