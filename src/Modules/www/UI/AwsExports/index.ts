import deepFreeze from "deep-freeze";
import json from "./config.json";

let baseUrl;
try {
  baseUrl = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
} catch (err) {
}

const AwsExports = deepFreeze({
  Auth: {
    identityPoolId     : json.identityPoolId,
    userPoolId         : json.userPoolId,
    userPoolWebClientId: json.userPoolWebClientId,
    region             : json.region,

    oauth: {
      domain         : json.oauth.domain,
      scope          : ['openid'],
      redirectSignIn : '/dummy-login',
      redirectSignOut: baseUrl,
      responseType   : 'token'
    }
  }
});
export default AwsExports;
