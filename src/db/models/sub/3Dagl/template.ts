/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class Template {

  constructor() { }

  /**
   * 新增模版
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.blockId,
        args.templateCd,
        args.templateTx,
        0,
        args.userId,
        args.userTx
      ];
      db.driver.execQuery(insert, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  /**
   * 更新模版
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.blockId,
        args.templateCd,
        args.templateTx,
        args.templateId
      ];
      db.driver.execQuery(update, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }
  

}

/**
 * 新增模版SQL
 */
const insert = `
  INSERT INTO 
    M_TEMPLATE (BLOCK_ID, TEMPLATE_CD, TEMPLATE_TX, DELETE_FL, ADDUSER_ID, ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?);
`;

/**
 * 更新模版SQL
 */
const update = `
  UPDATE
    M_TEMPLATE 
  SET
    BLOCK_ID = ?,
    TEMPLATE_CD = ?,
    TEMPLATE_TX = ?
  WHERE
    TEMPLATE_ID = ?
`;