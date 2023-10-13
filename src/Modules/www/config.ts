import {merge} from "lodash";
import deepFreeze, {DeepReadonly} from "deep-freeze";
import json from "www/UI/AwsExports/config.json";

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


// タイプ
export type ConfigType = typeof development;


// 開発環境（ローカル）
const development = {
  env: 'development',
  API: {
    url : 'http://localhost',
    port: 3001
  },
};

// テスト（ローカル）
const test = merge({}, development, {
  env: 'test',
});

// ステージング
const staging = merge({}, development, {
  env: 'staging',
  API: {
    url : json.apiEndpoint,
    port: ''
  }
});

// 本番環境
const production = merge({}, development, {
  env: 'production',
  API: {
    url : json.apiEndpoint,
    port: ''
  }
})


// 動的拡張タイプ
interface ConfigProxyType {
  // test + 環境変数
  testEnv: string,

  // API URL
  apiUrl: string,
}


// 動的拡張
export const config = new Proxy(deepFreeze({development, test, staging, production}[env]), {
  get(config, prop, receiver) {
    if (prop in config) {
      return Reflect.get(config, prop, receiver);
    }

    switch (prop) {
      case 'apiUrl': {
        if (config.API.port) {
          return `${config.API.url}:${config.API.port}`;
        }
        return config.API.url;
      }
    }
    throw new Error(`${String(prop)} is not defined.`);
  },

  set(_target: ConfigType, _p: string | symbol, _value: any, _receiver: any): boolean {
    return false;
  }
}) as DeepReadonly<ConfigType & ConfigProxyType>;
