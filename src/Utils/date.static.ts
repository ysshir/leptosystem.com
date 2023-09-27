export {}

declare global {

  interface DateConstructor {

    /**
     *
     * @param msec 待機時間（ミリ秒）
     */
    sleep: (msec: number) => Promise<null>;

    /**
     * {task}を実行して{msec}ミリ秒より早く終了した場合、{mse}cミリ秒経過するまでスリープ
     *
     * @param task 処理
     * @param msec 待機時間（ミリ秒）
     */
    duty: <T> (task: () => T, msec: number) => Promise<T | undefined>;

    /**
     * Dateに変換できなければundefinedを返す
     *
     * @param input
     */
    optional: (input: string) => Date | undefined;

    /**
     *
     * @param string
     */
    isValid: (string: string) => boolean;

    max: (...dates: (Date | null | undefined)[]) => Date | null;

    min: (...dates: (Date | null | undefined)[]) => Date | null;

    get SEC(): number;

    get MIN(): number;

    get HOUR(): number;

    get DAY(): number;
  }
}

/**
 *
 * @param msec
 */
Date.sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));

/**
 *
 * @param task
 * @param msec
 */
Date.duty = async (task, msec) => {
  const start = Date.now();

  let result, err;
  try {
    result = await task();

  } catch (_err) {
    err = _err;
  }

  const elapsed = Date.now() - start;
  if (elapsed < msec) {
    await Date.sleep(msec - elapsed);
  }

  if (err) {
    throw err;
  }
  return result;
}

/**
 *
 * @param input
 */
Date.optional = (input: string) => {
  if (input) {
    return new Date(input);
  }
  return undefined;
}

/**
 *
 * @param string
 */
Date.isValid = string => new Date(string).toDateString() !== 'Invalid Date';

/**
 *
 * @param dates
 */
Date.max = (...dates) => {
  return dates.reduce((ret, elem) => {
    if (elem === null || elem === undefined) {
      return ret;
    }
    // @ts-ignore
    return (ret < elem) ? elem : ret;
  }, null) as (Date | null);
}

/**
 *
 * @param dates
 */
Date.min = (...dates) => {
  return dates.reduce((ret, elem) => {
    if (elem === null || elem === undefined) {
      return ret;
    } else if (ret === null) {
      return elem;
    }

    // @ts-ignore
    return (elem < ret) ? elem : ret;
  }, null) as (Date | null);
}

Object.defineProperty(Date, 'SEC', {
  get: () => 1000
});

Object.defineProperty(Date, 'MIN', {
  get: () => 60 * 1000
});

Object.defineProperty(Date, 'HOUR', {
  get: () => 60 * 60 * 1000
});

Object.defineProperty(Date, 'DAY', {
  get: () => 24 * 60 * 60 * 1000
});
