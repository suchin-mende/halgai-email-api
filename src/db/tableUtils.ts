/**
 * @fileoverview Utils class for tables.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as Promise from 'bluebird';
import * as camelCase from 'camelcase-keys-deep';
const snakeCase = require('snake-case');

export class TableUtils {

  constructor() { }

  public static toCamelCase(args: string): string {
    return camelCase(args);
  }

  public static toSnakeCase(args: string): string {
    return snakeCase(args);
  }

  public static orderBy(def: string, args?: any): string {
    if (args && args.sort) {
      return this.toSnakeCase(args.sort).toUpperCase();
    } else {
      return def;
    }
  }

  public static formatOutSP(result: any) {
    if (result.length <= 0) {
      return [];
    }
    if (result.length === 1) {
      return result[0];
    }
    if (result.length > 1) {
      const arr = result[1];
      const resArray = [];
      for (let obj of arr) {
        let tempObject = {};
        for (let key in obj) {
          let newKey = key.replace(/@o/g, '').replace(/@/g, '');
          tempObject[newKey] = obj[key];
        }
        resArray.push(tempObject);
      }
      return resArray;
    }
  }

  public static filterModelWhere(model: any, key: string): string {
    let ret = '';
    switch (model.type) {
      case 'equals':
        ret = ` ${key} = ?`;
        break;
      case 'notEqual':
        ret = ` ${key} != ?`
        break;
      case 'startsWith':
        ret = ` ${key} LIKE ?`
        break;
      case 'endsWith':
        ret = ` ${key} LIKE ?`
        break;
      case 'notContains':
        ret = ` ${key} NOT LIKE ?`
        break;
      default:
        ret = ` ${key} LIKE ?`
        break;
    }
    return ret;
  }

  public static filterModelValue(model: any): string {
    let ret = '';
    switch (model.type) {
      case 'equals':
        ret = model.filter;
        break;
      case 'notEqual':
        ret = model.filter;
        break;
      case 'startsWith':
        ret = `${model.filter}%`;
        break;
      case 'endsWith':
        ret = `%${model.filter}`;
        break;
      case 'notContains':
        ret = `%${model.filter}%`;
        break;
      default:
        ret = `%${model.filter}%`;
        break;
    }
    return ret;
  }
}
