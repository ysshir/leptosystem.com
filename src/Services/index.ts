import {config} from "core/config";
import {AwsCredentialIdentity} from "@aws-sdk/types";
import {credentials as cliCredentials} from "core/Services/cli";

/**
 * 開発環境＆テスト環境用の認証情報 (ステージングと本番はIAM認証)
 */
export const credentials: () => {} | { credentials: AwsCredentialIdentity } = () => {
  try {
    if (config.env === 'development' || config.env === 'test') {
      return cliCredentials();
    }
  } catch (err) {
    console.error(err);
  }
  return {};
}

