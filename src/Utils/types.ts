/**
 * クラスから関数除外
 */
export type ExcludeMethods<T> = Pick<T, { [K in keyof T]-?: T[K] extends Function ? never : K }[keyof T]>;


/**
 * 上書き
 */
export type Overwrite<T, U extends { [Key in keyof T]?: unknown }> = Omit<
    T,
    keyof U
> & U;
