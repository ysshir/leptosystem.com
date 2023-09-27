import "core/Utils/core";
import dotenv from 'dotenv'
import fs from "fs";
import path from 'path'


try {
  // ファイルの所在地が src/Utils/
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({path: envPath});
  }
  // express実行時(ローカルテスト実行時)は /dist/以下に配置されて実行される
  else {
    dotenv.config({path: path.resolve(__dirname, '../.env')});
  }
} catch (err) {
}

// 開発環境用
export function inDev(callback: () => void): void {
  if (process.env.NODE_ENV === 'development') {
    callback();
  }
}
