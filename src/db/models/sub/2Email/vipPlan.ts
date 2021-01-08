/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class VipPlan {

  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  planList(args: any): Bluebird {
    return new Bluebird((resolve, reject) => {

      let query = selectVipPlan;

      const values = [];
      if (args) {
        const where = [];

        if (args.vipPlanCd != null) {
          where.push('VIP_PLAN_CD = ?')
          values.push(args.vipPlanCd)
        }

        if (args.parentPlanCd != null) {
          where.push('P_PLAN_CD = ?')
          values.push(args.parentPlanCd)
        }

        if (args.status != null) {
          where.push('STRECORD_ID = ?')
          values.push(args.status)
        }

        if (args.lang) {
          where.push('LANG = ?')
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

const selectVipPlan = `
  SELECT
    VIP_PLAN_CD,
    VIP_PLAN_TX,
    DESCRIPTION_TX,
    DESCRIPTION_LONG_TX,
    MONTH_NR,
    PRICE,
    EVENT_PRICE,
    EVENT_ENDDATE
  FROM
    M_VIP_PLAN
`