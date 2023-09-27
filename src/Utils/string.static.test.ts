import "core/Utils/commonjs";

describe('Utils/string.static.ts', () => {
  test('max', () => {
    expect(String.max('3', '4', '5', '1', '2')).toBe('5');
    expect(String.max('3', '4', '5', '10', '2')).toBe('5');
    expect(String.max('3', '4', '5', '1', '', '2')).toBe('5');
  });

  test('min', () => {
    expect(String.min('3', '4', '5', '1', '2')).toBe('1');
    expect(String.min('3', '4', '5', '10', '2')).toBe('10');
    expect(String.min('3', '4', '5', '1', '', '2')).toBe('');
  });

  // 修了
  afterAll(async () => {
  });
});
