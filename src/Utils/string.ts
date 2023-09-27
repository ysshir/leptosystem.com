import './string.static';

export {}

/**
 * String拡張
 */
declare global {
  interface String {

    // 数値文字列化
    toNumber(precision?: number): string | null;

    // 数字にカンマを付与
    get withComma(): string;
  }
}


String.prototype.toNumber = function (precision = 0) {
  const tmp = this.replace(/[０-９．]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
                  .replaceAll(/([^\-0-9.])/g, '');

  let [int, dec] = tmp.split('.');
  if (int.length === 0 && dec === undefined) {
    return null;
  }

  // 小数点以下桁数調整
  dec = (dec || '') + "0".repeat(precision);
  const ret = precision > 0 ? `${Number(int)}.${(dec ?? "0").substring(0, precision)}`
                            : `${Number(int)}`;

  // 念の為
  return isNaN(Number(ret)) ? null : ret;
}


Object.defineProperty(String.prototype, 'withComma', {
  get: function () {
    const orig = this.trim();
    if (orig === '') {
      return '';
    }

    let [int, dec] = orig.split('.');
    int = int.replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');

    if (dec) {
      return `${int}.${dec}`;
    }
    return `${int}`;
  }
});
