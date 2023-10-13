import "src/Utils/commonjs";
import shell from "shelljs";
import path from "path";
import {root} from "core/index";
import {CFOutputs} from "core/Services/CloudFormation";
import fs from "fs";
import {defaultRegion} from "core/Services/cli";


// コマンドライン
(async () => {
  const [, , command] = process.argv;

  switch (command) {
    case 'prebuild': {
      await prebuild();
      break;
    }

    case 'deploy': {
      await deploy();
      break;
    }

    default: {
      console.log('do nothing');
    }
  }
})();


async function prebuild() {
  const cognito    = await CFOutputs('www-cognito'),
        apiGateway = await CFOutputs('www-api');


  fs.mkdirSync(path.resolve(root, 'Modules/www/UI/AwsExports'), {recursive: true});
  fs.writeFileSync(path.resolve(root, 'Modules/www/UI/AwsExports/config.json'), JSON.stringify({
    region             : defaultRegion(),
    apiEndpoint        : apiGateway?.ApiEndpoint,
    identityPoolId     : cognito?.IdentityPoolId,
    userPoolId         : cognito?.UserPoolId,
    userPoolWebClientId: cognito?.UserPoolClientId,
    oauth              : {
      domain: cognito?.UserPoolDomain
    }
  }));
}


async function deploy() {
  try {
    // 出力情報を取得
    const outputs = await CFOutputs('www-cloudfront');
    if (!outputs || !("PublicBucketName" in outputs) || !("CloudFrontDistId" in outputs)) {
      throw 'not outputs ??';
    }

    const {PublicBucketName} = outputs,
          {CloudFrontDistId} = outputs;

    // S3と同期後に CloudFrontにInvalidationを作成
    const dir = path.resolve(root, '../dist/www-ui');
    s3sync(PublicBucketName, dir);
    invalidation(CloudFrontDistId);

  } catch (err) {
    console.error('スタック名「www-cloudfront」の情報が取得できませんでした', err);
  }
}

/**
 * @param bucketName
 * @param path
 */
function s3sync(bucketName: string, path: string): void {
  shell.exec(`aws s3 sync --profile ${process.env.AWS_PROFILE} ${path} s3://${bucketName} --delete`);
}


/**
 * @param distributionId
 */
function invalidation(distributionId: string): void {
  shell.exec(`aws cloudfront create-invalidation --profile ${process.env.AWS_PROFILE} --distribution-id ${distributionId} --paths "/*"`);
}
