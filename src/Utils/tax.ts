import Big from "big.js";

interface TaxRateType {
  since: string,
  rate: number,
  plazai?: number, // plaza-i 用 税率区分コード
}

const Rates = [
  {
    since : '2019-10-01',
    rate  : 10,
    plazai: 4,
  }, {
    since : '2014-04-01',
    rate  : 8,
    plazai: 3,
  }, {
    since: '1997-04-01',
    rate : 5,
  }, {
    since: '1989-04-01',
    rate : 3,
  }, {
    since: '0000-00-00',
    rate : 0,
  }
] as TaxRateType[];

/**
 * 消費税
 */
export class Tax {

  // 税率取得
  static get(date: Date | string): TaxRateType {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    date = date.toYmd();

    for (const rate of Rates) {
      if (rate.since <= date) {
        return rate;
      }
    }
    return Rates[Rates.length - 1];
  }

  /**
   * 外税の算出
   *
   * @param date
   * @param amount
   */
  static calc(date: Date | string, amount: number | Big): Big {
    const rate = this.get(date).rate;
    if (typeof amount === "number") {
      amount = new Big(amount);
    }
    return amount.times(rate).div(100);
  }

  /**
   * 内税の抽出
   *
   * @param date
   * @param amount
   */
  static extract(date: Date | string, amount: number | Big): Big {
    const rate = this.get(date).rate;
    if (typeof amount === "number") {
      amount = new Big(amount);
    }
    return amount.div(100 + rate).times(rate);
  }
}
