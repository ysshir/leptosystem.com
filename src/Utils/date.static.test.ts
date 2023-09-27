import "core/Utils/commonjs";

describe('Utils/date.static.ts', () => {
  test('max', () => {
    expect(Date.max(new Date('1980-01-31'), null, new Date('1980-02-01'))?.toYmd()).toBe('1980-02-01');
    expect(Date.max(new Date('1980-01-31'), null, undefined, new Date('1980-02-01'))?.toYmd()).toBe('1980-02-01');

    expect(Date.max(null, null, null)).toBe(null);
    expect(Date.max(undefined, undefined, undefined)).toBe(null);
  });

  test('min', () => {
    expect(Date.min(new Date('1980-01-31'), null, new Date('1980-02-01'))?.toYmd()).toBe('1980-01-31');
    expect(Date.min(new Date('1980-01-31'), null, undefined, new Date('1980-02-01'))?.toYmd()).toBe('1980-01-31');
    expect(Date.min(null, null, null)).toBe(null);
    expect(Date.min(undefined, undefined, undefined)).toBe(null);
  });

  // 修了
  afterAll(async () => {
  });
});
