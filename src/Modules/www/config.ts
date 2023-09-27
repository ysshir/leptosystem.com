import {merge} from "lodash";
import deepFreeze, {DeepReadonly} from "deep-freeze";

// 環境セット
type EnvironmentType = 'development' | 'test' | 'staging' | 'production';

// 環境設定
const env = (() => {
  try {
    return NODE_ENV || 'development';
  } catch (err) {
    return process.env.NODE_ENV || 'development';
  }
})() as EnvironmentType

console.log('env', env);

// タイプ
export type ConfigType = typeof development;


// 開発環境（ローカル）
const development = {
  env: 'development',
};

// テスト（ローカル）
const test = merge({}, development, {
  env: 'test',
});

// ステージング
const staging = merge({}, development, {
  env: 'staging',
});

// 本番環境
const production = merge({}, development, {
  env: 'production',
})


// 動的拡張タイプ
interface ConfigProxyType {
  // test + 環境変数
  testEnv: string,
}

// 動的拡張
export const config = new Proxy(deepFreeze({development, test, staging, production}[env]), {
  get(config, prop, receiver) {
    if (prop in config) {
      return Reflect.get(config, prop, receiver);
    }

    switch (prop) {
      case 'testEnv': {
        return `test - ${env}`;
      }
    }
    throw new Error(`${String(prop)} is not defined.`);
  },

  set(_target: ConfigType, _p: string | symbol, _value: any, _receiver: any): boolean {
    return false;
  }
}) as DeepReadonly<ConfigType & ConfigProxyType>;
