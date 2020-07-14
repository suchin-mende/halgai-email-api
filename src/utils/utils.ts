/**
 * @fileoverview Utils class.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

const moment = require('moment');

export class Utils {
  constructor() { }

  static getDate(date?: string): any {
    const jpRegex = /^[0-9]{4}[年-月]{1}[0-9]{2}[年-月]{1}[0-9]{2}[年-月]{1}$/g; // YYYY年MM月DD日
    const jp2Regex = /^[0-9]{2}[年-月]{1}[0-9]{2}[年-月]{1}[0-9]{4}[年-月]{1}$/g; // DD日MM月YYYY年

    if (date === undefined) {
      return null;
    }

    if (date.match(jpRegex) !== null) {
      return moment(date, 'YYYY年MM月DD日').format('YYYY-MM-DD');
    } else if (date.match(jp2Regex) !== null) {
      return moment(date, 'DD日MM月YYYY年').format('YYYY-MM-DD');
    }
    const d = new Date(date);
    if (moment(d).isValid()) {
      return moment(d).format('YYYY-MM-DD');
    }
    return null;
  }

  static getValueInRange(value: number, max: number, min = 0): number {
    return Math.max(Math.min(value, max), min);
  }

  // allow ascii charcter without control charcter
  static isCode(value: any): boolean {
    return (value.match(/^[\x21-\x7E]+$/)) ? true : false;
  }

  static isDate(value: any) {
    var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(value);
    if (!matches) {
      return false;
    }
    var y = parseInt(matches[1]);
    var m = parseInt(matches[2]);
    var d = parseInt(matches[3]);
    if (m < 1 || m > 12 || d < 1 || d > 31) {
      return false;
    }
    var dt = new Date(y, m - 1, d, 0, 0, 0, 0);
    if (dt.getFullYear() != y
      || dt.getMonth() != m - 1
      || dt.getDate() != d) {
      return false;
    }
    return true;
  }

  static isDefined(value: any): boolean {
    return value !== undefined && value !== null && value.trim() !== '';
  }

  static isFlag(value: any): boolean {
    return (value.match(/^0|1$/)) ? true : false;
  }

  static isInteger(value: any): boolean {
    return (value.match(/^[+,-]?([1-9]\d*|0)$/)) ? true : false;
  }

  static isIntegerPlus(value: any): boolean {
    return (value.match(/^[+]?([1-9]\d*|0)$/)) ? true : false;
  }

  // decimalPlaceNr: number of decimal place (小数点以下桁数)
  static isNumber(value: any, decimalPlaceNr?: number): boolean {
    if (value.match(/^[+,-]?([1-9]\d*|0)(\.\d+)?$/)) {
      if (decimalPlaceNr === undefined) {
        return true;
      } else {
        // number of decimal place should be integer
        decimalPlaceNr = Math.floor(decimalPlaceNr);
        // check number of decimal place
        let target = value.toString().split('.');
        if (target[0]) {
          return (target[0].length <= decimalPlaceNr) ? true : false;
        } else {
          // no decimal place
          return true;
        }
      }
    } else {
      return false;
    }
  }

  // decimalPlaceNr: number of decimal place (小数点以下桁数)
  static isNumberPlus(value: any, decimalPlaceNr?: number): boolean {
    if (value.match(/^[+]?([1-9]\d*|0)(\.\d+)?$/)) {
      if (decimalPlaceNr === undefined) {
        return true;
      } else {
        // number of decimal place should be integer
        decimalPlaceNr = Math.floor(decimalPlaceNr);
        // check number of decimal place
        let target = value.toString().split('.');
        if (target[1]) {
          // trim trailing zero
          return (target[1].replace(/0+$/, "").length <= decimalPlaceNr) ? true : false;
        } else {
          // no decimal place
          return true;
        }
      }
    } else {
      return false;
    }
  }

  static isPostalCode(value: any): boolean {
    return (value.match(/^[0-9]{3}-?[0-9]{4}$/)) ? true : false;
  }

  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  static isTel(value: any): boolean {
    return (value.match(/^[0-9()-]+$/)) ? true : false;
  }

  static padNumber(value: number) {
    if (Utils.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  static regExpEscape(text): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  static toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  static toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
  }

  static isJSON(str: string): boolean {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }

  static sjisByteLength(str: string): number {
    var length = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        length += 1;
      } else {
        length += 2;
      }
    }
    return length;
  }

  static isPref(str: string): boolean {
    let ref = false;
    let prefArray = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島", "沖縄県"];
    for (var i = 0; i < prefArray.length; i++) {
      if (prefArray[i] === str) ref = true;
    }
    return ref;
  }

  static getRandom( min:number, max:number ): number {

    var random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}

}
