import {procedure, router} from "www/API/trpc";
import {z} from "zod";


export const TestRouter = router({
  // 掛け算
  times:
      procedure
          .input(z.object({
            a: z.string().default('').refine(v => v.toNumber() !== null, '数値を入力してください').transform(v => Number(v)).or(z.number()),
            b: z.string().default('').refine(v => v.toNumber() !== null, '数値を入力してください').transform(v => Number(v)).or(z.number()),
          }))
          .query(async ({input}) => {
            return input.a * input.b;
          }),
});
