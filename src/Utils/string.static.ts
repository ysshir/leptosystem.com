export {}

/**
 * String拡張
 */
declare global {
  interface StringConstructor {
    max: (...args: string[]) => string;
    min: (...args: string[]) => string;
  }
}


String.max = (...args) => {
  return args.reduce((result, el) => result < el ? el : result, '');
}

String.min = (...args) => {
  return args.reduce((result, el) => result > el ? el : result, args[0]);
}
