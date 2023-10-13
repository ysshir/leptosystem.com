import "src/Utils/commonjs";

import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import {config} from "www/config";
import {appRouter} from "www/API/AppRouter";
import {ContextType} from "www/API/context";


/**
 * ローカル開発環境用ウェブサーバー
 */
const app: express.Express = express();
app.use(cors({origin: "*"}));


const expressHandler = trpcExpress.createExpressMiddleware({
  router: appRouter,
  async createContext(): Promise<ContextType> {
    return {};
  }
});

app.use('/', async (req, res, next) => expressHandler(req, res, next));

app.listen(config.API.port);
