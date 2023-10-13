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
npm run cloudformation:impl --proc=create --stackname=www-ecr                                                                        --filepath=file://$(pwd)/CloudFormation/www/02.ecr-repository.yaml
npm run cloudformation:impl --proc=create --stackname=www-api                                                                        --filepath=file://$(pwd)/CloudFormation/www/03.api-gateway.yaml  
npm run cloudformation:impl --proc=create --stackname=www-cognito                                                                    --filepath=file://$(pwd)/CloudFormation/www/04.cognito.yaml
npm run cloudformation:impl --proc=create --stackname=www-lambda                                                                     --filepath=file://$(pwd)/CloudFormation/www/05.lambda.yaml  
```

- 更新コマンド
```zsh
npm run cloudformation:impl --proc=update --stackname=www-cloudfront --parameters=ParameterKey=SSLCertArn,ParameterValue=$SSLCertArn --filepath=file://$(pwd)/CloudFormation/www/01.cloudfront.yaml
npm run cloudformation:impl --proc=update --stackname=www-ecr                                                                        --filepath=file://$(pwd)/CloudFormation/www/02.ecr-repository.yaml
npm run cloudformation:impl --proc=udpate --stackname=www-api                                                                        --filepath=file://$(pwd)/CloudFormation/www/03.api-gateway.yaml  
npm run cloudformation:impl --proc=update --stackname=www-cognito                                                                    --filepath=file://$(pwd)/CloudFormation/www/04.cognito.yaml  
npm run cloudformation:impl --proc=update --stackname=www-lambda                                                                     --filepath=file://$(pwd)/CloudFormation/www/05.lambda.yaml  
```


### デプロイ

- フロント更新<br/>
  `npm run www:ui:update`
 

- サーバーサイド更新<br/>
  `npm run www:api:update`
