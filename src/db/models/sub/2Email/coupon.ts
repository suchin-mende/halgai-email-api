/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class Coupon {

  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  select(args: any): Bluebird {
    return new Bluebird((resolve, reject) => {

      let query = selectCoupon;

      const values = [];
      if (args) {
        const where = [];

        if (args.couponCd) {
          where.push('COUPON_CD = ?')
          values.push(args.couponCd)
        }

        if (args.lang) {
          where.push('LANG_TX = ?')
          values.push(args.lang)
        }

        if (args.serviceId) {
          where.push('SERVICE_ID = ?')
          values.push(args.serviceId)
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
    });
  }

}

const selectCoupon = `
  SELECT
    COUPON_ID,
    COUPON_CD,
    COUPON_TX,
    DESCRIPTION_TX,
    DESCRIPTION_LONG_TX,
    TYPE,
    DISCOUNT_RATE,
    PRICE,
    FROM_DT,
    TO_DT
  FROM
    M_COUPON
`