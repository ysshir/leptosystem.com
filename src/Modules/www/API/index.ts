import "src/Utils/commonjs";
import {awsLambdaRequestHandler} from "@trpc/server/adapters/aws-lambda";
import {appRouter} from "www/API/AppRouter";
import {ContextType} from "www/API/context";
import {APIGatewayEvent, Context} from 'aws-lambda';

if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}

/**
 * Lambdaハンドラー
 */
const handler = awsLambdaRequestHandler({
  router: appRouter,
  async createContext(arg: any): Promise<ContextType> {
    try {
      const auth   = arg.event.requestContext.authorizer.iam,
            userId = auth.cognitoIdentity.amr.join('|').match(/CognitoSignIn:([-a-zA-Z0-9]*)/)[1];

      console.log(userId);

      return {};

    } catch (err) {
      console.error(err);

      return {
        user: null
      }
    }
  }
})

export const lambdaHandler = async (event: APIGatewayEvent, context: Context) => handler(event, context);
