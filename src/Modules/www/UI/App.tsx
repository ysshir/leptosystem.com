import React, {Context, createContext, FC, useContext} from 'react';
import {Amplify, Auth} from "aws-amplify";
import {createTRPCProxyClient, CreateTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "www/API/AppRouter";
import {RootPage} from "www/UI/Pages";
import superjson from "superjson";
import {config} from 'www/config';
import {SignatureV4} from "@aws-sdk/signature-v4";
import {Sha256 as sha256} from "@aws-crypto/sha256-browser/build/crossPlatformSha256";
import AwsExports from "www/UI/AwsExports";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {parseQueryString} from "@aws-sdk/querystring-parser";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Amplify初期化
Amplify.configure(AwsExports);

type TRPCClient = CreateTRPCProxyClient<AppRouter>;

// TRPCクライアント共有
const TRPCContext: Context<TRPCClient> = createContext<TRPCClient>({} as TRPCClient);
export const useTRPC                   = () => useContext(TRPCContext);


export const App: FC = () => {

  // TPRCクライアント生成
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: config.apiUrl,

        // フェッチのオーバーライド
        async fetch(aurl, options) {

          // リクエストの作成
          const url                      = new URL(aurl.toString());
          const httpRequest: HttpRequest = new HttpRequest({
            headers : {
              host: url.hostname,
            },
            method  : options?.method,
            hostname: url.hostname,
            path    : url.pathname,
            query   : parseQueryString(url.search),
            body    : options?.body
          });

          // 署名v4
          const signer        = await createSignerV4('ap-northeast-1', 'execute-api');
          const signedRequest = await signer.sign(httpRequest, {
            unsignableHeaders: new Set(['x-amz-content-sha256'])
          });

          // 署名済みリクエストの実行
          return fetch(url.toString(), {
            headers: {
              'authorization'       : signedRequest.headers['authorization'],
              'x-amz-security-token': signedRequest.headers['x-amz-security-token'],
              'x-amz-date'          : signedRequest.headers['x-amz-date'],
            },
            method : signedRequest.method,
            body   : signedRequest.body
          });
        },
      })
    ],

    transformer: superjson,
  });

  return (
      <TRPCContext.Provider value={trpc}>
        <RootPage/>
      </TRPCContext.Provider>
  );
}

const createSignerV4: (region: string, service: string) => Promise<SignatureV4> = async (region, service) => {
  const credentials = await Auth.currentCredentials();

  return new SignatureV4({
    region,
    service,
    credentials: {
      accessKeyId    : credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken   : credentials.sessionToken
    },
    sha256
  });
}

