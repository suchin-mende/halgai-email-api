/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class FamilyLoan {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByLoanSearchForm;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('TU.DEL_FL=0');
        where.push('TU.OWNER_FL=1');
        values.push(args.ownerId);
        if (args.userId) {
          where.push(' TU.USER_ID=?');
          values.push(args.userId);
        }
        if (args.familyCd) {
          where.push(' TU.FAMILY_CD=?');
          values.push(args.familyCd);
        } else if (filterModel && filterModel.familyCd) {
          where.push(TableUtils.filterModelWhere(filterModel.familyCd, 'TU.FAMILY_CD'));
          values.push(TableUtils.filterModelValue(filterModel.familyCd));
        }
        if (args.userTx) {
          where.push(' TU.USER_TX=?');
          values.push(args.userTx);
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'TU.USER_TX'));
          values.push(TableUtils.filterModelValue(filterModel.userTx));
        }
        if (args.loan0111Tx) {
          where.push(' TF.LOAN0111_TX=?');
          values.push(args.loan0111Tx);
        }
        if (args.loan0112Nr) {
          where.push(' TF.LOAN0112_NR=?');
          values.push(args.loan0112Nr);
        }
        if (args.loan0113Dt) {
          where.push(' TF.LOAN0113_DT=?');
          values.push(args.loan0113Dt);
        }
        if (args.loan0121Tx) {
          where.push(' TF.LOAN0121_TX=?');
          values.push(args.loan0121Tx);
        }
        if (args.loan0122Nr) {
          where.push(' TF.LOAN0122_NR=?');
          values.push(args.loan0122Nr);
        }
        if (args.loan0123Dt) {
          where.push(' TF.LOAN0123_DT=?');
          values.push(args.loan0123Dt);
        }
        if (args.loan0131Tx) {
          where.push(' TF.LOAN0131_TX=?');
          values.push(args.loan0131Tx);
        }
        if (args.loan0132Nr) {
          where.push(' TF.LOAN0132_NR=?');
          values.push(args.loan0132Nr);
        }
        if (args.loan0133Dt) {
          where.push(' TF.LOAN0133_DT=?');
          values.push(args.loan0133Dt);
        }
        if (args.loan0211Nr) {
          where.push(' TF.LOAN0211_NR=?');
          values.push(args.loan0211Nr);
        }
        if (args.loan0212Dt) {
          where.push(' TF.LOAN0212_DT=?');
          values.push(args.loan0212Dt);
        }
        if (args.loan0221Nr) {
          where.push(' TF.LOAN0221_NR=?');
          values.push(args.loan0221Nr);
        }
        if (args.loan0222Dt) {
          where.push(' TF.LOAN0222_DT=?');
          values.push(args.loan0222Dt);
        }
        if (args.loan0231Nr) {
          where.push(' TF.LOAN0231_NR=?');
          values.push(args.loan0231Nr);
        }
        if (args.loan0232Dt) {
          where.push(' TF.LOAN0232_DT=?');
          values.push(args.loan0232Dt);
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
      console.log("query=====" + query);
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

  count(db: any, args?: any) {
    return new Promise((resolve, reject) => {
      let query = selectCount;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('TU.DEL_FL=0');
        where.push('TU.OWNER_FL=1');
        values.push(args.ownerId);
        if (args.userId) {
          where.push(' TU.USER_ID=?');
          values.push(args.userId);
        }
        if (args.familyCd) {
          where.push(' TU.FAMILY_CD=?');
          values.push(args.familyCd);
        } else if (filterModel && filterModel.familyCd) {
          where.push(TableUtils.filterModelWhere(filterModel.familyCd, 'TU.FAMILY_CD'));
          values.push(TableUtils.filterModelValue(filterModel.familyCd));
        }
        if (args.userTx) {
          where.push(' TU.USER_TX=?');
          values.push(args.userTx);
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'TU.USER_TX'));
          values.push(TableUtils.filterModelValue(filterModel.userTx));
        }
        if (args.loan0111Tx) {
          where.push(' TF.LOAN0111_TX=?');
          values.push(args.loan0111Tx);
        }
        if (args.loan0112Nr) {
          where.push(' TF.LOAN0112_NR=?');
          values.push(args.loan0112Nr);
        }
        if (args.loan0113Dt) {
          where.push(' TF.LOAN0113_DT=?');
          values.push(args.loan0113Dt);
        }
        if (args.loan0121Tx) {
          where.push(' TF.LOAN0121_TX=?');
          values.push(args.loan0121Tx);
        }
        if (args.loan0122Nr) {
          where.push(' TF.LOAN0122_NR=?');
          values.push(args.loan0122Nr);
        }
        if (args.loan0123Dt) {
          where.push(' TF.LOAN0123_DT=?');
          values.push(args.loan0123Dt);
        }
        if (args.loan0131Tx) {
          where.push(' TF.LOAN0131_TX=?');
          values.push(args.loan0131Tx);
        }
        if (args.loan0132Nr) {
          where.push(' TF.LOAN0132_NR=?');
          values.push(args.loan0132Nr);
        }
        if (args.loan0133Dt) {
          where.push(' TF.LOAN0133_DT=?');
          values.push(args.loan0133Dt);
        }
        if (args.loan0211Nr) {
          where.push(' TF.LOAN0211_NR=?');
          values.push(args.loan0211Nr);
        }
        if (args.loan0212Dt) {
          where.push(' TF.LOAN0212_DT=?');
          values.push(args.loan0212Dt);
        }
        if (args.loan0221Nr) {
          where.push(' TF.LOAN0221_NR=?');
          values.push(args.loan0221Nr);
        }
        if (args.loan0222Dt) {
          where.push(' TF.LOAN0222_DT=?');
          values.push(args.loan0222Dt);
        }
        if (args.loan0231Nr) {
          where.push(' TF.LOAN0231_NR=?');
          values.push(args.loan0231Nr);
        }
        if (args.loan0232Dt) {
          where.push(' TF.LOAN0232_DT=?');
          values.push(args.loan0232Dt);
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
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data[0]));
        }
      });
    });
  }

  update(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      const values = [
        args.companyId,
        args.logicalWhId,
        args.ownerId,
        args.familyLoanId,
        args.familyCd,

        args.headuserId,
        args.headuserTx,
        args.loan0111Tx,
        args.loan0112Nr,
        args.loan0113Dt,

        args.loan0121Tx,
        args.loan0122Nr,
        args.loan0123Dt,
        args.loan0131Tx,
        args.loan0132Nr,

        args.loan0133Dt,
        args.loan0211Nr,
        args.loan0212Dt,
        args.loan0221Nr,
        args.loan0222Dt,

        args.loan0231Nr,
        args.loan0232Dt,
        args.noteTx,

        args.userId,
        args.userTx,
        args.updprogramCd,
      ];
      db.driver.execQuery(update, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

  del(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      db.driver.execQuery(deleteByUserIdForTaLoanList, [args], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectByLoanSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYLOAN TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
    LEFT OUTER JOIN TA_FAMILYLOAN TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const update = 'CALL PW_FAMILYLOAN_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const deleteByUserIdForTaLoanList = `
UPDATE
  TA_FAMILYLOAN
SET
	DEL_FL = 1
WHERE
  HEADUSER_ID = ?
`;
