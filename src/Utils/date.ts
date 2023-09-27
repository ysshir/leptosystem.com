import './date.static';

export {}

declare global {
  interface Date {
    zMonth(): string;

    zDate(): string;

    zHours(): string;

    zMinutes(): string;

    zSeconds(): string;

    toMd(): string;

    toYmd(): string;

    toYmdJP(): string;

    toYmdSlash(): string;

    toMdHm(): string;

    toHm(): string;

    toHmJP(): string;

    toHms(): string;

    toYmdThm(): string;

    toYmdThms(): string;

    toYmd_hms(): string;

    ymd(): string;

    yyyymmddhhmmss(): string;

    clone(): Date;

    addYear(y: number): this;

    addMonth(m: number): this;

    addDate(d: number): this;

    addHour(h: number): this;

    addMin(m: number): this;

    addSec(s: number): this;

    setYmd(input: [number | string | undefined, number | string | undefined, number | string | undefined]): this;

    setHms(input: [number | string | undefined, number | string | undefined, number | string | undefined, number | string | undefined]): this;

    get isLeapYear(): boolean;
  }
}


Date.prototype.zMonth = function (): string {
  return String(this.getMonth() + 1).padStart(2, '0');
}

Date.prototype.zDate = function (): string {
  return String(this.getDate()).padStart(2, '0');
}

Date.prototype.zHours = function (): string {
  return String(this.getHours()).padStart(2, '0');
}

Date.prototype.zMinutes = function (): string {
  return String(this.getMinutes()).padStart(2, '0');
}

Date.prototype.zSeconds = function (): string {
  return String(this.getSeconds()).padStart(2, '0')
}

Date.prototype.toMd = function (): string {
  return `${this.zMonth()}-${this.zDate()}`;
}

Date.prototype.toYmd = function (): string {
  return `${this.getFullYear()}-${this.zMonth()}-${this.zDate()}`;
}

Date.prototype.toYmdJP = function (): string {
  return `${this.getFullYear()}年${this.zMonth()}月${this.zDate()}日`;
}

Date.prototype.toYmdSlash = function (): string {
  return `${this.getFullYear()}/${this.zMonth()}/${this.zDate()}`;
}

Date.prototype.toMdHm = function (): string {
  return `${(this.getMonth() + 1)}/${this.zDate()} ${this.toHm()}`;
}

Date.prototype.toHm = function (): string {
  return `${this.zHours()}:${this.zMinutes()}`;
}

Date.prototype.toHmJP = function (): string {
  return `${this.zHours()}時${this.zMinutes()}分`;
}

Date.prototype.toHms = function (): string {
  return `${this.zHours()}:${this.zMinutes()}:${this.zSeconds()}`;
}

Date.prototype.toYmdThm = function (): string {
  return `${this.toYmd()}T${this.toHm()}`;
}

Date.prototype.toYmdThms = function (): string {
  return `${this.toYmd()}T${this.toHms()}`;
}

Date.prototype.toYmd_hms = function (): string {
  return `${this.toYmd()} ${this.toHms()}`;
}

Date.prototype.ymd = function (): string {
  return `${this.getFullYear()}${this.zMonth()}${this.zDate()}`;
}

Date.prototype.yyyymmddhhmmss = function (): string {
  return `${this.getFullYear()}${this.zMonth()}${this.zDate()}T${this.zHours()}${this.zMinutes()}${this.zSeconds()}`;
}

Date.prototype.clone = function (): Date {
  return new Date(this.getTime());
}

Date.prototype.addYear = function (y): Date {
  this.setFullYear(this.getFullYear() + y);
  return this;
}

Date.prototype.addMonth = function (m): Date {
  this.setMonth(this.getMonth() + m);
  return this;
}

Date.prototype.addDate = function (d): Date {
  this.setDate(this.getDate() + d);
  return this;
}

Date.prototype.addHour = function (h): Date {
  this.setHours(this.getHours() + h);
  return this;
}

Date.prototype.addMin = function (m): Date {
  this.setMinutes(this.getMinutes() + m);
  return this;
}

Date.prototype.addSec = function (s): Date {
  this.setSeconds(this.getSeconds() + s);
  return this;
}

Date.prototype.setYmd = function ([y, m, d]): Date {
  this.setFullYear(
      _set(y, this.getFullYear()),
      _set(m, this.getMonth(), -1),
      _set(d, this.getDate()));

  return this;
}

Date.prototype.setHms = function ([h, m, s, ms]): Date {
  this.setHours(
      _set(h, this.getHours()),
      _set(m, this.getMinutes()),
      _set(s, this.getSeconds()),
      _set(ms, this.getMilliseconds()));

  return this;
}

function _set(input: string | number | undefined, curr: number, adj: number = 0): number {
  return typeof input === 'string' ? curr + Number(input.toNumber())
                                   : typeof input === 'number' ? input + adj
                                                               : curr;
}


Object.defineProperty(Date.prototype, 'isLeapYear', {
  get: function () {
    const year = this.getFullYear();
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        return year % 400 === 0;
      }
      return true;
    }
    return false;
  }
});
