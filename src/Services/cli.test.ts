import {accountId, defaultRegion} from "core/Services/cli";

describe('Service/cli.ts', () => {
  test('accountId', () => {
    const result = accountId();
    // expect(result).toBe("xxxxxxxxxxxx");
  });

  test('defaultRegion', () => {
    const result = defaultRegion();
    expect(result).toBe('ap-northeast-1');
  })

  // 修了
  afterAll(async () => {
  });
});
