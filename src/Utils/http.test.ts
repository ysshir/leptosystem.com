import "core/Utils/commonjs";
import {downloadFile} from "core/Utils/http";

describe('Utils/http.ts', () => {
  test('downloadFile', async () => {
    await downloadFile('https://crowdbank.jp/', '/tmp/crowdbank-index.html');
    expect(true).toBe(true);
  });

  // 修了
  afterAll(async () => {
  });
});
