export {}

/**
 * Number拡張
 */
declare global {
  interface Number {

    // 数字にカンマを付与
    get withComma(): string;
  }
}


Object.defineProperty(Number.prototype, 'withComma', {
  get: function () {
    return this.toString().withComma;
  }
});
