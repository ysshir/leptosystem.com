import "core/Utils/commonjs";
import {memoize} from "lodash";
import shell from "shelljs";

/**
 * AWSアカウントID
 */
export const accountId: () => string = memoize(() => {
  const result = shell.exec(`aws sts get-caller-identity --profile ${process.env.AWS_PROFILE} --output yaml | sed -n -r "/Account:/p" | sed -r "s/Account: '([0-9]{12})'/\\1/"`);
  return result.toString().trim();
});


/**
 * リージョン
 */
export function defaultRegion(): string {
  return getConfigure('region');
}

/**
 * 認証情報
 */
export function credentials(): { credentials: { accessKeyId: string, secretAccessKey: string } } {
  const accessKeyId: string     = getConfigure('aws_access_key_id'),
        secretAccessKey: string = getConfigure('aws_secret_access_key');

  return {
    credentials: {accessKeyId, secretAccessKey}
  }
}

/**
 * @param param
 */
const getConfigure: (param: string) => string = memoize((param: string) => {
  return shell.exec(`aws configure --profile ${process.env.AWS_PROFILE} get ${param}`).toString().trim();
});
