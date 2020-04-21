/**
 * @fileoverview Cache handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */
import { Settings } from '../config/settings';
import { Messages } from './messages';
import { ErrorCodes } from './errorCodes';

export class ErrorUtils {
  constructor() { }

  /**
   * エラーJson取得
   *
   * @param lang 言語設定
   * @param messageKey メッセージキー
   * @param args パラメータ
   * @return エラーJson
   */
  static getErrorJson(lang: string, messageKey: string, args?: any): object {
    if (Messages[lang] === undefined) {
      lang = 'ja';
    }

    let msg = Messages[lang][messageKey]
    if (args && Array.isArray(args)) {
      const variables = args.join(',');
      console.log(format(Messages[lang][messageKey], args));
      msg = format(Messages[lang][messageKey], args);
    }

    const err = {
      message: msg,
      code: errorCode(messageKey)
    };
    return err;
  }

  static getDefaultErrorCode(): string {
    return Settings.string.DEFAULT_ERROR_CODE;
  }
}

const errorCode = messageKey => {
  return ErrorCodes[messageKey] || Settings.string.DEFAULT_ERROR_CODE;
}

const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift());