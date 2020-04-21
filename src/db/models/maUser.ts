/**
 * @fileoverview DB Model for ma_user.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../tableUtils';
import { Utils } from '../../utils/utils';
import * as Promise from 'bluebird';

export class MaUser {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  authUser(username: string, companyCd: string, callback: any) {
    this.db.driver.execQuery(authUser, [username, companyCd], (err, data) => {
      callback(err, TableUtils.toCamelCase(data[0]));
    });
  }

  getUsers(args?: any) {
    return new Promise((resolve, reject) => {
      let query = findUsers;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        if (args.userId) {
          where.push(' MU.USER_ID=?');
          values.push(args.userId);
        }
        if (args.userCd) {
          where.push(' MU.USER_CD=?');
          values.push(args.userCd);
        } else if (filterModel && filterModel.userCd) {
          where.push(TableUtils.filterModelWhere(filterModel.userCd, 'MU.USER_CD'));
          values.push(TableUtils.filterModelValue(filterModel.userCd));
        }
        if (args.userTx) {
          where.push(' MU.USER_TX=?');
          values.push(args.userTx);
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'MU.USER_TX'));
          values.push(TableUtils.filterModelValue(filterModel.userTx));
        }
        if (args.roleId) {
          where.push(' MU.ROLE_ID=?');
          values.push(args.roleId);
        }
        if (args.roleTx) {
          where.push(' MR.ROLE_TX=?');
          values.push(args.roleTx);
        } else if (filterModel && filterModel.roleTx) {
          where.push(TableUtils.filterModelWhere(filterModel.roleTx, 'MR.ROLE_TX'));
          values.push(TableUtils.filterModelValue(filterModel.roleTx));
        }
        if (args.logicalWhId) {
          where.push(' MW.LOGICAL_WH_ID=?');
          values.push(args.logicalWhId);
        }
        if (filterModel && filterModel.logicalWhTx) {
          where.push(TableUtils.filterModelWhere(filterModel.logicalWhTx, 'MW.LOGICAL_WH_TX'));
          values.push(TableUtils.filterModelValue(filterModel.logicalWhTx));
        }
        if (filterModel && filterModel.langTx) {
          where.push(TableUtils.filterModelWhere(filterModel.langTx, 'MU.LANG_TX'));
          values.push(TableUtils.filterModelValue(filterModel.langTx));
        }
        if (filterModel && filterModel.updDt) {
          if (filterModel.updDt.type === 'inRange') {
            where.push(' UPD_DT >= ?');
            values.push(filterModel.updDt.dateFrom);
            where.push(' UPD_DT <= ?');
            values.push(filterModel.updDt.dateTo);
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.updDt, 'UPD_DT'));
            values.push(TableUtils.filterModelValue(filterModel.updDt));
          }
        }
        if (filterModel && filterModel.addDt) {
          if (filterModel.addDt.type === 'inRange') {
            where.push(' ADD_DT >= ?');
            values.push(filterModel.addDt.dateFrom);
            where.push(' ADD_DT <= ?');
            values.push(filterModel.addDt.dateTo);
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.addDt, 'ADD_DT'));
            values.push(TableUtils.filterModelValue(filterModel.addDt));
          }
        }
        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }
        // Check if there are pagination parameters
        if (args.colId) {
          query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`;
        }
        if (args.endRow) {
          query = ` ${query} LIMIT ${args.startRow || 0},${args.endRow}`;
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

  count(args?: any) {
    return new Promise((resolve, reject) => {
      let query = selectCount;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        if (args.userId) {
          where.push(' MU.USER_ID=?');
          values.push(args.userId);
        }
        if (args.userCd) {
          where.push(' MU.USER_CD=?');
          values.push(args.userCd);
        } else if (filterModel && filterModel.userCd) {
          where.push(TableUtils.filterModelWhere(filterModel.userCd, 'MU.USER_CD'));
          values.push(TableUtils.filterModelValue(filterModel.userCd));
        }
        if (args.userTx) {
          where.push(' MU.USER_TX=?');
          values.push(args.userTx);
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'MU.USER_TX'));
          values.push(TableUtils.filterModelValue(filterModel.userTx));
        }
        if (args.roleId) {
          where.push(' MU.ROLE_ID=?');
          values.push(args.roleId);
        }
        if (args.roleTx) {
          where.push(' MR.ROLE_TX=?');
          values.push(args.roleTx);
        } else if (filterModel && filterModel.roleTx) {
          where.push(TableUtils.filterModelWhere(filterModel.roleTx, 'MR.ROLE_TX'));
          values.push(TableUtils.filterModelValue(filterModel.roleTx));
        }
        if (args.logicalWhId) {
          where.push(' MW.LOGICAL_WH_ID=?');
          values.push(args.logicalWhId);
        }
        if (filterModel && filterModel.logicalWhTx) {
          where.push(TableUtils.filterModelWhere(filterModel.logicalWhTx, 'MW.LOGICAL_WH_TX'));
          values.push(TableUtils.filterModelValue(filterModel.logicalWhTx));
        }
        if (filterModel && filterModel.langTx) {
          where.push(TableUtils.filterModelWhere(filterModel.langTx, 'MU.LANG_TX'));
          values.push(TableUtils.filterModelValue(filterModel.langTx));
        }
        if (filterModel && filterModel.updDt) {
          if (filterModel.updDt.type === 'inRange') {
            where.push(' UPD_DT >= ?');
            values.push(filterModel.updDt.dateFrom);
            where.push(' UPD_DT <= ?');
            values.push(filterModel.updDt.dateTo);
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.updDt, 'UPD_DT'));
            values.push(TableUtils.filterModelValue(filterModel.updDt));
          }
        }
        if (filterModel && filterModel.addDt) {
          if (filterModel.addDt.type === 'inRange') {
            where.push(' ADD_DT >= ?');
            values.push(filterModel.addDt.dateFrom);
            where.push(' ADD_DT <= ?');
            values.push(filterModel.addDt.dateTo);
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.addDt, 'ADD_DT'));
            values.push(TableUtils.filterModelValue(filterModel.addDt));
          }
        }
        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }
      }
      this.db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data[0]));
        }
      });
    });
  }
}

let authUser = `
SELECT
  MU.USER_ID,
  MU.USER_CD,
  MU.USER_TX,
  MU.LANG_TX,
  MU.PASSWORD_TX,
  MU.UPD_DT,
  MU.ADD_DT,
  MU.ADDUSER_ID,
  MU.ADDUSER_TX,
  MU.UPDUSER_ID,
  MU.UPDUSER_TX,
  MR.ROLE_ID,
  MR.ROLE_TX,
  MW.LOGICAL_WH_ID,
  MW.LOGICAL_WH_TX,
  MC.COMPANY_ID,
  MC.COMPANY_CD,
  MC.COMPANY_TX,
  MCI.CONNECTION_CD,
  AK.API_KEY_TX
FROM
  MA_USER MU
    LEFT JOIN MA_ROLE MR
      ON MU.ROLE_ID = MR.ROLE_ID
    LEFT JOIN USER_LOGICAL_WH UW
      ON MU.USER_ID = UW.USER_ID
    LEFT JOIN MA_LOGICAL_WH MW
      ON UW.LOGICAL_WH_ID = MW.LOGICAL_WH_ID
    LEFT JOIN MA_COMPANY MC
      ON MU.COMPANY_ID = MC.COMPANY_ID
    LEFT JOIN MA_CONNECTION_INFO MCI
      ON MW.CONNECTION_CD = MCI.CONNECTION_CD
    LEFT JOIN API_KEY AK
      ON MU.COMPANY_ID = AK.COMPANY_ID
WHERE
  MU.USER_CD = ? AND
  MC.COMPANY_CD = ?
LIMIT 1
`;

let findUsers = `
SELECT
  MU.USER_ID,
  MU.USER_CD,
  MU.USER_TX,
  MU.LANG_TX,
	DATE_FORMAT(MU.UPD_DT, '%Y-%m-%d %H:%i:%S') AS UPD_DT,
	DATE_FORMAT(MU.ADD_DT, '%Y-%m-%d %H:%i:%S') AS ADD_DT,
  MR.ROLE_ID,
  MR.ROLE_TX,
  MW.LOGICAL_WH_ID,
  MW.LOGICAL_WH_TX
FROM
  MA_USER MU
    LEFT JOIN MA_ROLE MR
      ON MU.ROLE_ID = MR.ROLE_ID
    LEFT JOIN USER_LOGICAL_WH UW
      ON MU.USER_ID = UW.USER_ID
    LEFT JOIN MA_LOGICAL_WH MW
      ON UW.LOGICAL_WH_ID = MW.LOGICAL_WH_ID
`;

let selectCount = `
SELECT
COUNT(*) AS TOTAL
FROM
  MA_USER MU
    LEFT JOIN MA_ROLE MR
      ON MU.ROLE_ID = MR.ROLE_ID
    LEFT JOIN USER_LOGICAL_WH UW
      ON MU.USER_ID = UW.USER_ID
    LEFT JOIN MA_LOGICAL_WH MW
      ON UW.LOGICAL_WH_ID = MW.LOGICAL_WH_ID
`;
