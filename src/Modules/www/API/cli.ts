import path from "path";
import shell from "shelljs";
import {v4 as uuid} from "uuid";
import {accountId, defaultRegion} from "core/Services/cli";
import {CFOutputs} from "core/Services/CloudFormation";
import fs from "fs";
import {root} from "core/index";


// コマンドライン
(async () => {
  const [, , command] = process.argv;

  switch (command) {
    case 'deploy': {
      await deploy();
      break;
    }

    default: {
      console.log('do nothing');
    }
  }
})();


async function deploy() {
  try {
    const props = {
      uuid     : uuid(),
      accountId: accountId(),
      region   : defaultRegion()
    };


    // 出力情報を取得
    const outputs = await CFOutputs('www-ecr');
    if (!outputs || !("LambdaRepositoryName" in outputs) || !("LambdaRepositoryUri" in outputs)) {
      throw 'not outputs ??';
    }


    const {LambdaRepositoryName} = outputs,
          {LambdaRepositoryUri}  = outputs,
          LambdaRepositoryDomain = LambdaRepositoryUri.split('/')[0],
          srcFile                = path.resolve(__dirname, 'index.ts'),
          dockerFile             = path.resolve(__dirname, 'Dockerfile');

    const commands = [
      // ビルド
      `npm run esbuild --src=${srcFile} --dist=dist/ecr.js`,

      // 作業ディレクトリ作成を作成して、必要なファイルをコピー
      `mkdir /tmp/${props.uuid}`,
      `cp ${dockerFile} /tmp/${props.uuid}/Dockerfile`,
      `cp dist/ecr.js /tmp/${props.uuid}/index.js`,
      `cp dist/ecr.js.map /tmp/${props.uuid}/index.js.map`,

      // ビルドしてECRにデプロイ
      `docker build /tmp/${props.uuid} -t ${LambdaRepositoryName}`,
      `aws ecr get-login-password --region ${props.region} | docker login --username AWS --password-stdin ${LambdaRepositoryDomain}`,
      `docker tag ${LambdaRepositoryName}:latest ${LambdaRepositoryUri}:latest`,
      `docker push ${LambdaRepositoryUri}:latest`,

      // // Lambda更新
      // proc === 'update' ? `aws lambda update-function-code --function-name ${lambdaName} --image-uri ${props.accountId}.dkr.ecr.${props.region}.amazonaws.com/${repositoryName}:latest`
      //                   : '',

      // 作業ディレクトリ削除
      `rm -rf /tmp/${props.uuid}`
    ];
    shell.exec(commands.filter(el => el).join(' && '));

  } catch (err) {
    console.error('デプロイ中にエラーが発生しました', err);
  }
}
