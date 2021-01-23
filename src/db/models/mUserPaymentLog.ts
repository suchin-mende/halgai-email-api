/**
 * @fileoverview DB Model for m_user.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../tableUtils';
import * as Promise from 'bluebird';

export class MUserPaymentLog {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  insertPaymentLog (args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        new Date(),
        args.userId,
        args.serviceId,
        args.lang,
        args.payFl,
        args.vipPlanCd,
        args.monthNr,
        args.price,
        args.paymentType,
        args.couponId,
        args.addUser,
        args.addUserTx,
        0
      ]
      this.db.driver.execQuery(insertPaymentLogSql, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  selectPayment (args: any) {
    return new Promise((resolve, reject) => {

      let query = selectPaymentLogSql;

      const values = [];
      if (args) {
        const where = [];

        if (args.logId) {
          where.push('PAYMENT_LOG_ID = ?')
          values.push(args.logId)
        }

        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }
      }

      this.db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    })
  }

}

const insertPaymentLogSql = `
  INSERT
    USER_PAYMENT_LOG
  (
    LOG_DT,
    USER_ID,
    SERVICE_ID,
    LANG,
    PAY_FL,
    VIP_PLAN_CD,
    MONTH_NR,
    PRICE,
    PAYMENT_TYPE,
    COUPON_ID,
    ADDUSER_ID,
    ADDUSER_TX,
    UPDCOUNTER_NR
  )
  VALUES
  (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`;

const selectPaymentLogSql = `
  SELECT
    PAYMENT_LOG_ID,
    LOG_DT,
    USER_ID,
    SERVICE_ID,
    LANG,
    PAY_FL,
    VIP_PLAN_CD,
    MONTH_NR,
    PRICE,
    PAYMENT_TYPE,
    COUPON_ID,
    ADDUSER_ID,
    ADDUSER_TX,
    UPDCOUNTER_NR
  FROM
    USER_PAYMENT_LOG
`
