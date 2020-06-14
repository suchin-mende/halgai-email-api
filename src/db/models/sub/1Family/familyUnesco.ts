/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class FamilyUnesco {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByUnescoSearchForm;
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
        if (args.unesco01Fl) {
          where.push(' TF.UNESCO01_FL=?');
          values.push(args.unesco01Fl);
        }
        if (args.unesco02Fl) {
          where.push(' TF.UNESCO02_FL=?');
          values.push(args.unesco02Fl);
        }
        if (args.unesco030Fl) {
          where.push(' TF.UNESCO030_FL=?');
          values.push(args.unesco030Fl);
        }
        if (args.unesco031Tx) {
          where.push(' TF.UNESCO031_TX=?');
          values.push(args.unesco031Tx);
        }
        if (args.unesco032Dt) {
          where.push(' TF.UNESCO032_DT=?');
          values.push(args.unesco032Dt);
        }
        if (args.unesco033Tx) {
          where.push(' TF.UNESCO033_TX=?');
          values.push(args.unesco033Tx);
        }
        if (args.unesco034Tx) {
          where.push(' TF.UNESCO034_TX=?');
          values.push(args.unesco034Tx);
        }
        if (args.unesco040Fl) {
          where.push(' TF.UNESCO040_FL=?');
          values.push(args.unesco040Fl);
        }
        if (args.unesco041Tx) {
          where.push(' TF.UNESCO041_TX=?');
          values.push(args.unesco041Tx);
        }
        if (args.unesco042Dt) {
          where.push(' TF.UNESCO042_DT=?');
          values.push(args.unesco042Dt);
        }
        if (args.unesco043Tx) {
          where.push(' TF.UNESCO043_TX=?');
          values.push(args.unesco043Tx);
        }
        if (args.unesco044Tx) {
          where.push(' TF.UNESCO044_TX=?');
          values.push(args.unesco044Tx);
        }
        if (args.unesco050Fl) {
          where.push(' TF.UNESCO050_FL=?');
          values.push(args.unesco050Fl);
        }
        if (args.unesco051Tx) {
          where.push(' TF.UNESCO051_TX=?');
          values.push(args.unesco051Tx);
        }
        if (args.unesco052Dt) {
          where.push(' TF.UNESCO052_DT=?');
          values.push(args.unesco052Dt);
        }
        if (args.unesco053Tx) {
          where.push(' TF.UNESCO053_TX=?');
          values.push(args.unesco053Tx);
        }
        if (args.unesco054Tx) {
          where.push(' TF.UNESCO054_TX=?');
          values.push(args.unesco054Tx);
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
        if (args.unesco01Fl) {
          where.push(' TF.UNESCO01_FL=?');
          values.push(args.unesco01Fl);
        }
        if (args.unesco02Fl) {
          where.push(' TF.UNESCO02_FL=?');
          values.push(args.unesco02Fl);
        }
        if (args.unesco030Fl) {
          where.push(' TF.UNESCO030_FL=?');
          values.push(args.unesco030Fl);
        }
        if (args.unesco031Tx) {
          where.push(' TF.UNESCO031_TX=?');
          values.push(args.unesco031Tx);
        }
        if (args.unesco032Dt) {
          where.push(' TF.UNESCO032_DT=?');
          values.push(args.unesco032Dt);
        }
        if (args.unesco033Tx) {
          where.push(' TF.UNESCO033_TX=?');
          values.push(args.unesco033Tx);
        }
        if (args.unesco034Tx) {
          where.push(' TF.UNESCO034_TX=?');
          values.push(args.unesco034Tx);
        }
        if (args.unesco040Fl) {
          where.push(' TF.UNESCO040_FL=?');
          values.push(args.unesco040Fl);
        }
        if (args.unesco041Tx) {
          where.push(' TF.UNESCO041_TX=?');
          values.push(args.unesco041Tx);
        }
        if (args.unesco042Dt) {
          where.push(' TF.UNESCO042_DT=?');
          values.push(args.unesco042Dt);
        }
        if (args.unesco043Tx) {
          where.push(' TF.UNESCO043_TX=?');
          values.push(args.unesco043Tx);
        }
        if (args.unesco044Tx) {
          where.push(' TF.UNESCO044_TX=?');
          values.push(args.unesco044Tx);
        }
        if (args.unesco050Fl) {
          where.push(' TF.UNESCO050_FL=?');
          values.push(args.unesco050Fl);
        }
        if (args.unesco051Tx) {
          where.push(' TF.UNESCO051_TX=?');
          values.push(args.unesco051Tx);
        }
        if (args.unesco052Dt) {
          where.push(' TF.UNESCO052_DT=?');
          values.push(args.unesco052Dt);
        }
        if (args.unesco053Tx) {
          where.push(' TF.UNESCO053_TX=?');
          values.push(args.unesco053Tx);
        }
        if (args.unesco054Tx) {
          where.push(' TF.UNESCO054_TX=?');
          values.push(args.unesco054Tx);
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
        args.familyUnescoId,
        args.familyCd,

        args.headuserId,
        args.headuserTx,
        args.unesco01Fl,
        args.unesco02Fl,
        args.unesco030Fl,

        args.unesco031Tx,
        args.unesco032Dt,
        args.unesco033Tx,
        args.unesco034Tx,
        args.unesco040Fl,

        args.unesco041Tx,
        args.unesco042Dt,
        args.unesco043Tx,
        args.unesco044Tx,
        args.unesco050Fl,

        args.unesco051Tx,
        args.unesco052Dt,
        args.unesco053Tx,
        args.unesco054Tx,
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
      db.driver.execQuery(deleteByUserIdForTaUnescoList, [args], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectByUnescoSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYUNESCO TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
    LEFT OUTER JOIN TA_FAMILYUNESCO TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const update = 'CALL PW_FAMILYUNESCO_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const deleteByUserIdForTaUnescoList = `
UPDATE
  TA_FAMILYUNESCO
SET
	DEL_FL = 1
WHERE
  HEADUSER_ID = ?
`;
