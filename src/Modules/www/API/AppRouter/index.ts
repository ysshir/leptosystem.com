import {router} from "www/API/trpc";
import {TestRouter} from "./Test";

/**
 * ルーター
 */
export const appRouter = router({
  test: TestRouter,
})

/**
 * ルーター for Client
 */
export type AppRouter = typeof appRouter;
