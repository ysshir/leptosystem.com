import "core/Utils/commonjs";

describe('Utils/date.ts', () => {
  test('isLeapYear', () => {
    expect(new Date('1999-01-01').isLeapYear).toBe(false);
    expect(new Date('2000-01-01').isLeapYear).toBe(true);
    expect(new Date('2001-01-01').isLeapYear).toBe(false);
    expect(new Date('2002-01-01').isLeapYear).toBe(false);
    expect(new Date('2003-01-01').isLeapYear).toBe(false);
    expect(new Date('2004-01-01').isLeapYear).toBe(true);
    expect(new Date('2005-01-01').isLeapYear).toBe(false);
    expect(new Date('2100-01-01').isLeapYear).toBe(false);
    expect(new Date('2200-01-01').isLeapYear).toBe(false);
    expect(new Date('2300-01-01').isLeapYear).toBe(false);
    expect(new Date('2400-01-01').isLeapYear).toBe(true);
  });

  // 修了
  afterAll(async () => {
  });
});
