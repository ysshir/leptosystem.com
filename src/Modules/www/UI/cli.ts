import "src/Utils/commonjs";
import {CloudFormationClient, DescribeStacksCommand} from "@aws-sdk/client-cloudformation";
import {credentials, defaultRegion} from "core/Services/cli";
import shell from "shelljs";
import path from "path";
import {root} from "core/index";

// 利用するサービスクライアント
const clients = {
  cf: new CloudFormationClient([{
    region     : defaultRegion(),
    credentials: credentials(),
  }])
};


// コマンドライン
(async () => {
  const [, , command] = process.argv;

  switch (command) {
    case 'deploy': {
      // CloudFormationで作成したS3バケット CloudFrontの情報を取得して、ファイルを更新
      try {
        // CloudFormationから必要な情報を取得
        const command  = new DescribeStacksCommand({
                StackName: 'www-cloudfront',
              }),
              response = await clients.cf.send(command),
              outputs  = response?.Stacks?.[0]?.Outputs?.reduce((result, elem) => {
                if (elem.OutputKey && elem.OutputValue) {
                  result[elem.OutputKey] = elem.OutputValue;
                }
                return result;
              }, {} as Record<string, string>);

        // 必要な出力情報が取得できない
        if (!outputs || !outputs.PublicBucketName || !outputs.CloudFrontDistId) {
          throw 'not outputs ??';
        }

        // S3と同期後に CloudFrontにInvalidationを作成
        const dir = path.resolve(root, '../dist/www-ui');
        s3sync(outputs.PublicBucketName, dir);
        invalidation(outputs.CloudFrontDistId);

      } catch (err) {
        console.error('スタック名「www-cloudfront」の情報が取得できませんでした', err);
      }
      break;
    }

    default: {
      console.log('do nothing');
    }
  }
})();


/**
 * @param bucketName
 * @param path
 */
export function s3sync(bucketName: string, path: string): void {
  shell.exec(`aws s3 sync --profile ${process.env.AWS_PROFILE} ${path} s3://${bucketName} --delete`);
}


/**
 * @param distributionId
 */
export function invalidation(distributionId: string): void {
  shell.exec(`aws cloudfront create-invalidation --profile ${process.env.AWS_PROFILE} --distribution-id ${distributionId} --paths "/*"`);
}
