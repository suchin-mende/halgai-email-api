/**
 * @fileoverview DB Model for owner.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class Owner {
  constructor() { }

  select(db: any, args?: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectQuery;
      const values = [];
      if (args) {
        const where = [];
        if (args.companyId) {
          where.push(' MO.COMPANY_ID=?');
          values.push(args.companyId);
        }
        if (args.logicalWhId) {
          where.push(' MO.LOGICALWH_ID=?');
          values.push(args.logicalWhId);
        }
        if (args.ownerId) {
          where.push(' MO.OWNER_ID=?');
          values.push(args.ownerId);
        }
        if (args.ownerCd) {
          where.push(' MO.OWNER_CD LIKE ?');
          values.push('%' + args.ownerCd + '%');
        }
        if (args.ownerTx) {
          where.push(' MO.OWNER_TX LIKE ?');
          values.push('%' + args.ownerTx + '%');
        }
        if (args.owneraccCd) {
          where.push(' MO.OWNERACC_CD LIKE ?');
          values.push('%' + args.owneraccCd + '%');
        }
        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }
      }
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectQuery = `
SELECT
  MO.COMPANY_ID,
  MO.LOGICALWH_ID,
  --
  MO.OWNER_ID,
  MO.OWNER_CD,
  MO.OWNER_TX,
  CONCAT(MO.OWNER_CD, ':', MO.OWNER_TX) AS OWNERDISPLAY_TX,
  MO.OWNERACC_CD,
  -- 管理項目
	DATE_FORMAT(MO.UPD_DT, '%Y-%m-%d %H:%i:%S') AS UPD_DT,
  MO.UPDUSER_ID,
  MO.UPDUSER_TX,
	DATE_FORMAT(MO.ADD_DT, '%Y-%m-%d %H:%i:%S') AS ADD_DT,
  MO.ADDUSER_ID,
  MO.ADDUSER_TX,
  MO.UPDPROGRAM_CD,
  MO.UPDCOUNTER_NR
FROM
	MA_OWNER MO
`;
