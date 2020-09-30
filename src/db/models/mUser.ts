/**
 * @fileoverview DB Model for m_user.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../tableUtils';
import { Utils } from '../../utils/utils';
import * as Promise from 'bluebird';
import { Logger } from '../../utils/logger';

export class MUser {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  authUser (userCd: string, serviceId: number, companyCd: string, callback: any) {
    Logger.log('info', 'userCd==' + userCd); Logger.log('info', 'serviceId==' + serviceId); Logger.log('info', 'companyCd==' + companyCd);
    this.db.driver.execQuery(authUser, [userCd, serviceId, companyCd], (err, data) => {
      callback(err, TableUtils.toCamelCase(data[0]));
    });
  }

  getUsers (args?: any) {
    return new Promise((resolve, reject) => {
      let query = findUsers;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('DEL_FL = 0');
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
        if (args.tel) {
          where.push(' MU.TEL=?');
          values.push(args.tel);
        }
        if (args.roleTx) {
          where.push(' MR.ROLE_TX=?');
          values.push(args.roleTx);
        } else if (filterModel && filterModel.roleTx) {
          where.push(TableUtils.filterModelWhere(filterModel.roleTx, 'MR.ROLE_TX'));
          values.push(TableUtils.filterModelValue(filterModel.roleTx));
        }
        if (args.serviceId) {
          where.push(' US.SERVICE_ID=?');
          values.push(args.serviceId);
        }
        if (args.openId) {
          where.push(' MU.W_OPEN_ID=? ');
          values.push(args.openId);
        }
        if (filterModel && filterModel.serviceTx) {
          where.push(TableUtils.filterModelWhere(filterModel.serviceTx, 'MS.SERVICE_TX'));
          values.push(TableUtils.filterModelValue(filterModel.serviceTx));
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
        where.push('DEL_FL = 0');
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
        if (args.serviceId) {
          where.push(' US.SERVICE_ID=?');
          values.push(args.serviceId);
        }
        if (filterModel && filterModel.serviceTx) {
          where.push(TableUtils.filterModelWhere(filterModel.serviceTx, 'MS.SERVICE_TX'));
          values.push(TableUtils.filterModelValue(filterModel.serviceTx));
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
          resolve(data[0].TOTAL);
        }
      });
    });
  }

  insert (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.userCd,
        args.companyId,
        args.serviceId,
        args.roleId,
        args.userTx,
        args.langTx,
        args.password,
        args.telTx,
        args.lockFl,
        args.resetFl,
        args.vipPlanCd,
        args.updprogramCd
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

  update (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.userId,
        args.serviceId,
        args.userTx,
        args.langTx,
        args.roleId,
        args.mail,
        args.lockFl,
        args.resetFl,
        args.countryCd,

        args.tel,
        args.myNo,
        args.sex,
        args.wechatCd,
        args.updprogramCd
      ]
      this.db.driver.execQuery(update, values, (err, data) => {
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
        args.serviceId,
        args.userId,
        args.langTx,
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

  updatePW (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.userId,
        args.serviceId,
        args.langTx,
        args.password
      ]
      this.db.driver.execQuery(updatePW, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  // 更新用户微信openId
  updateWxOpenId (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.openId,
        args.serviceId,
        args.userId
      ]
      this.db.driver.execQuery(updateWxOpenIdSql, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  // 验证微信用户登录
  authWxUser (openId: string, serviceId: number, companyCd: string) {
    return new Promise((resolve, reject) => {
      this.db.driver.execQuery(authWxUser, [openId, serviceId, companyCd], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data[0]))
        }      
      })
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
  MU.COUNTRY_CD,
  MU.MAIL,
  MU.LOCK_FL,
  MU.RESET_FL,
  MU.TEL,
  MU.MY_NO,
  MU.SEX,
  MU.WECHAT_CD,
  MU.UPD_DT,
  MU.ADD_DT,
  MU.ADDUSER_ID,
  MU.ADDUSER_TX,
  MU.UPDUSER_ID,
  MU.UPDUSER_TX,
  US.AUTHORITY_ID,
  MA.AUTHORITY_TX,
  US.ROLE_ID,
  MR.ROLE_TX,
  US.LAST_LOGIN_DT,
  US.CONTINUE_LOGIN_NR,
  US.POINT_NR,
  US.VIP_FL,
  US.VIP_PLAN_CD,
  US.VIP_FROM_DT,
  US.VIP_TO_DT,
  MV.VIP_PLAN_TX,
  MS.SERVICE_ID,
  MS.SERVICE_TX,
  MC.COMPANY_ID,
  MC.COMPANY_CD,
  MC.COMPANY_TX,
  MCI.CONNECTION_CD,
  MS.API_KEY_TX
FROM
  M_USER MU
    LEFT JOIN USER_SERVICE US
      ON MU.USER_ID = US.USER_ID
    LEFT JOIN M_ROLE MR
      ON US.ROLE_ID = MR.ROLE_ID
    LEFT JOIN M_AUTHORITY MA
      ON US.AUTHORITY_ID = MA.AUTHORITY_ID
    LEFT JOIN M_VIP_PLAN MV
      ON US.VIP_PLAN_CD = MV.VIP_PLAN_CD
    LEFT JOIN M_SERVICE MS
      ON US.SERVICE_ID = MS.SERVICE_ID
    LEFT JOIN M_COMPANY MC
      ON MS.COMPANY_ID = MC.COMPANY_ID
    LEFT JOIN M_CONNECTION_INFO MCI
      ON MS.CONNECTION_CD = MCI.CONNECTION_CD
WHERE
  MU.USER_CD = ? AND
  US.SERVICE_ID = ? AND
  MC.COMPANY_CD = ?
LIMIT 1
`;

let findUsers = `
SELECT
  MU.USER_ID,
  MU.USER_CD,
  MU.USER_TX,
  MU.LANG_TX,
  MU.PASSWORD_TX,
  MU.MAIL,
  MU.LOCK_FL,
  MU.RESET_FL,
  MU.COUNTRY_CD,
  MU.TEL,
  MU.MY_NO,
  MU.SEX,
  MU.WECHAT_CD,
	DATE_FORMAT(MU.UPD_DT, '%Y-%m-%d %H:%i:%S') AS UPD_DT,
	DATE_FORMAT(MU.ADD_DT, '%Y-%m-%d %H:%i:%S') AS ADD_DT,
  MR.ROLE_ID,
  MR.ROLE_TX,
  MS.SERVICE_ID,
  MS.SERVICE_TX
FROM
  M_USER MU
    LEFT JOIN USER_SERVICE US
      ON MU.USER_ID = US.USER_ID
    LEFT JOIN M_SERVICE MS
      ON US.SERVICE_ID = MS.SERVICE_ID
    LEFT JOIN M_ROLE MR
      ON US.ROLE_ID = MR.ROLE_ID
`;

let selectCount = `
SELECT
COUNT(*) AS TOTAL
FROM
  M_USER MU
    LEFT JOIN USER_SERVICE US
      ON MU.USER_ID = US.USER_ID
    LEFT JOIN M_SERVICE MS
      ON US.SERVICE_ID = MS.SERVICE_ID
    LEFT JOIN M_ROLE MR
      ON US.ROLE_ID = MR.ROLE_ID
`;

const updateWxOpenIdSql = `
  UPDATE
    M_USER
  SET
    W_OPEN_ID = ?,
    SERVICE_ID = ?
  WHERE
    USER_ID = ?
`;

let authWxUser = `
SELECT
  MU.USER_ID,
  MU.USER_CD,
  MU.USER_TX,
  MU.LANG_TX,
  MU.PASSWORD_TX,
  MU.COUNTRY_CD,
  MU.MAIL,
  MU.LOCK_FL,
  MU.RESET_FL,
  MU.TEL,
  MU.MY_NO,
  MU.SEX,
  MU.WECHAT_CD,
  MU.UPD_DT,
  MU.ADD_DT,
  MU.ADDUSER_ID,
  MU.ADDUSER_TX,
  MU.UPDUSER_ID,
  MU.UPDUSER_TX,
  US.AUTHORITY_ID,
  MA.AUTHORITY_TX,
  US.ROLE_ID,
  MR.ROLE_TX,
  US.LAST_LOGIN_DT,
  US.CONTINUE_LOGIN_NR,
  US.POINT_NR,
  US.VIP_FL,
  US.VIP_PLAN_CD,
  US.VIP_FROM_DT,
  US.VIP_TO_DT,
  MV.VIP_PLAN_TX,
  MS.SERVICE_ID,
  MS.SERVICE_TX,
  MC.COMPANY_ID,
  MC.COMPANY_CD,
  MC.COMPANY_TX,
  MCI.CONNECTION_CD,
  MS.API_KEY_TX
FROM
  M_USER MU
    LEFT JOIN USER_SERVICE US
      ON MU.USER_ID = US.USER_ID
    LEFT JOIN M_ROLE MR
      ON US.ROLE_ID = MR.ROLE_ID
    LEFT JOIN M_AUTHORITY MA
      ON US.AUTHORITY_ID = MA.AUTHORITY_ID
    LEFT JOIN M_VIP_PLAN MV
      ON US.VIP_PLAN_CD = MV.VIP_PLAN_CD
    LEFT JOIN M_SERVICE MS
      ON US.SERVICE_ID = MS.SERVICE_ID
    LEFT JOIN M_COMPANY MC
      ON MS.COMPANY_ID = MC.COMPANY_ID
    LEFT JOIN M_CONNECTION_INFO MCI
      ON MS.CONNECTION_CD = MCI.CONNECTION_CD
WHERE
  MU.W_OPEN_ID = ? AND
  US.SERVICE_ID = ? AND
  MC.COMPANY_CD = ?
LIMIT 1
`;

const insert = 'CALL USER_Ins(?,?,?,?,?,?,?,?,?,?,?,?)'
const update = 'CALL USER_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const del = 'CALL USER_Del(?,?,?)'
const updatePW = 'CALL USER_UpdPw(?,?,?,?)'
