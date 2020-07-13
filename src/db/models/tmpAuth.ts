/**
 * @fileoverview DB Model for m_user.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../tableUtils';
import { Utils } from '../../utils/utils';
import * as Promise from 'bluebird';

export class TmpAuth {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  getTmpAuth(args?: any) {
    return new Promise((resolve, reject) => {
      let query = findUsers;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        if (args.userCd) {
          where.push(' USER_CD=?');
          values.push(args.userCd);
        }
        if (args.serviceId) {
          where.push(' SERVICE_ID=?');
          values.push(args.serviceId);
        }
        if (args.telTx) {
          where.push(' TEL=?');
          values.push(args.telTx);
        }
        if (args.authCd) {
          where.push(' AUTH_CD=?');
          values.push(args.authCd);
        }

        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }
        if (args.endRow) {
          query = ` ${query} LIMIT 1`;
        }
      }
      this.db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

  insert (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.userCd,
        args.serviceId,
        args.langTx,
        args.telTx,
        args.authCd
      ]
      this.db.driver.execQuery(insert, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }


  delete (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.userCd,
        args.serviceId,
        args.langTx,
        args.telTx,
        args.authCd
      ]
      this.db.driver.execQuery(del, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }
}

let findUsers = `
SELECT
  *
FROM
  TMP_AUTH
`;


const insert = 'CALL TMP_AUTH_Ins(?,?,?,?,?)'
const del = 'CALL TMP_AUTH_Del(?,?,?,?,?)'
