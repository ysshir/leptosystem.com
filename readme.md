# leptosystem.com

- インフラはCloudFormationで管理
- 環境毎にAWSアカウントを分ける

### CloudFormation


#### 環境変数

- スタック名Prefix 「`Prefix`」
- AWSプロファイル名「`AWS_PROFILE`」
- 環境名「`env`」


#### 作成・更新コマンド
新しいスタックを追加するたびにここに追記していく<br>
プロジェクトルートから実行

- 作成コマンド
```zsh
npm run cloudformation:impl --proc=create --stackname=www-cloudfront --parameters=ParameterKey=SSLCertArn,ParameterValue=$SSLCertArn --filepath=file://$(pwd)/CloudFormation/www/01.cloudfront.yaml  
```

- 更新コマンド
```zsh
npm run cloudformation:impl --proc=update --stackname=www-cloudfront --parameters=ParameterKey=SSLCertArn,ParameterValue=$SSLCertArn --filepath=file://$(pwd)/CloudFormation/www/01.cloudfront.yaml
```
