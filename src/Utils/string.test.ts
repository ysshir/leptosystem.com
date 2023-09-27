import "core/Utils/commonjs";

describe('Utils/string.ts', () => {
  test('withComma', () => {
    expect("1234.56".withComma).toBe('1,234.56');
    expect("1234.567".withComma).toBe('1,234.567');
    expect("1234.5678".withComma).toBe('1,234.5678');

  });

  test('toNumber', () => {
    expect("1234.567".toNumber()).toBe('1234');
    expect("1234.567".toNumber(0)).toBe('1234');
    expect("1234.567".toNumber(1)).toBe('1234.5');
    expect("1234.567".toNumber(2)).toBe('1234.56');
    expect("1234.567".toNumber(3)).toBe('1234.567');
    expect("1234.567".toNumber(4)).toBe('1234.5670');

    expect("あｄｆ１２３４．５６７".toNumber()).toBe('1234');
    expect("あｄｆ１２３４．５６７".toNumber(0)).toBe('1234');
    expect("あｄｆ１２３４．５６７".toNumber(1)).toBe('1234.5');
    expect("あｄｆ１２３４．５６７".toNumber(2)).toBe('1234.56');
    expect("あｄｆ１２３４．５６７".toNumber(3)).toBe('1234.567');
    expect("あｄｆ１２３４．５６７".toNumber(4)).toBe('1234.5670');
    expect("1e+24".toNumber()).toBe('124');

    expect("あいうえお".toNumber()).toBe(null);
    expect("あいうえお".toNumber(2)).toBe(null);
  });

  // 修了
  afterAll(async () => {
  });
});
