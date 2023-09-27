export {}

/**
 * Array拡張
 */
declare global {
  interface Array<T> {
    toggle(input: T): Array<T>;

    // codeSort(): Array<T>;
    index<IdType extends string | number | symbol>(idName: string): Record<IdType, T>
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.toggle = function (input) {
  if (this.includes(input)) {
    return this.filter(elem => elem !== input);
  }
  return [...this, input];
}

// // eslint-disable-next-line no-extend-native
// Array.prototype.codeSort = function () {
//   return this.sort((a, b) => {
//     if (a.sort === b.sort) {
//       return a.name.localeCompare(b.name, 'ja');
//     }
//     return a.sort - b.sort;
//   })
// }

// eslint-disable-next-line no-extend-native
Array.prototype.index = function <IdType extends string | number | symbol>(idName: string) {
  return this.reduce((res, el) => {
    res[el[idName]] = el;
    return res;
  }, {});
}
