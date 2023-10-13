import {initTRPC} from "@trpc/server";
import superjson from "superjson";

/**
 * 再帰的にJSON化
 */
const preSerialize: (object: any) => any = object => {
  try {
    if (object !== undefined && object !== null) {

      // 配列
      if (Array.isArray(object)) {
        return object.map(elem => preSerialize(elem));
      }
      // Pojo
      else if (object.constructor.name === 'Object') {
        return Object.entries(object).reduce((result, [k, v]) => {
          result[k] = preSerialize(v);
          return result;
        }, {} as Record<any, any>);
      }
    }

    // null、その他、クラス
    return object;

  } catch (err) {
    console.error(err);
    throw err;
  }
}


/**
 * TRPC作成
 */
export function createTRPC<T extends Record<string, any>>() {
  return initTRPC.context<T>().create({
    transformer: {
      serialize  : (object: any) => superjson.serialize(preSerialize(object)),
      deserialize: (object: any) => superjson.deserialize(object),
    },
  })
}

