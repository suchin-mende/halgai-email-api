/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class FamilySpending {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectBySpendingSearchForm;
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
        if (args.spending011Nr) {
          where.push(' TF.SPENDING011_NR=?');
          values.push(args.spending011Nr);
        }
        if (args.spending012Nr) {
          where.push(' TF.SPENDING012_NR=?');
          values.push(args.spending012Nr);
        }
        if (args.spending013Nr) {
          where.push(' TF.SPENDING013_NR=?');
          values.push(args.spending013Nr);
        }
        if (args.spending014Nr) {
          where.push(' TF.SPENDING014_NR=?');
          values.push(args.spending014Nr);
        }
        if (args.spending015Nr) {
          where.push(' TF.SPENDING015_NR=?');
          values.push(args.spending015Nr);
        }
        if (args.spending021Nr) {
          where.push(' TF.SPENDING021_NR=?');
          values.push(args.spending021Nr);
        }
        if (args.spending022Nr) {
          where.push(' TF.SPENDING022_NR=?');
          values.push(args.spending022Nr);
        }
        if (args.spending023Nr) {
          where.push(' TF.SPENDING023_NR=?');
          values.push(args.spending023Nr);
        }
        if (args.spending024Nr) {
          where.push(' TF.SPENDING024_NR=?');
          values.push(args.spending024Nr);
        }
        if (args.spending025Nr) {
          where.push(' TF.SPENDING025_NR=?');
          values.push(args.spending025Nr);
        }
        if (args.spending031Nr) {
          where.push(' TF.SPENDING031_NR=?');
          values.push(args.spending031Nr);
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
        if (args.spending011Nr) {
          where.push(' TF.SPENDING011_NR=?');
          values.push(args.spending011Nr);
        }
        if (args.spending012Nr) {
          where.push(' TF.SPENDING012_NR=?');
          values.push(args.spending012Nr);
        }
        if (args.spending013Nr) {
          where.push(' TF.SPENDING013_NR=?');
          values.push(args.spending013Nr);
        }
        if (args.spending014Nr) {
          where.push(' TF.SPENDING014_NR=?');
          values.push(args.spending014Nr);
        }
        if (args.spending015Nr) {
          where.push(' TF.SPENDING015_NR=?');
          values.push(args.spending015Nr);
        }
        if (args.spending021Nr) {
          where.push(' TF.SPENDING021_NR=?');
          values.push(args.spending021Nr);
        }
        if (args.spending022Nr) {
          where.push(' TF.SPENDING022_NR=?');
          values.push(args.spending022Nr);
        }
        if (args.spending023Nr) {
          where.push(' TF.SPENDING023_NR=?');
          values.push(args.spending023Nr);
        }
        if (args.spending024Nr) {
          where.push(' TF.SPENDING024_NR=?');
          values.push(args.spending024Nr);
        }
        if (args.spending025Nr) {
          where.push(' TF.SPENDING025_NR=?');
          values.push(args.spending025Nr);
        }
        if (args.spending031Nr) {
          where.push(' TF.SPENDING031_NR=?');
          values.push(args.spending031Nr);
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
        args.familySpendingId,
        args.familyCd,

        args.headuserId,
        args.headuserTx,
        args.spending011Nr,
        args.spending012Nr,
        args.spending013Nr,

        args.spending014Nr,
        args.spending015Nr,
        args.spending021Nr,
        args.spending022Nr,
        args.spending023Nr,

        args.spending024Nr,
        args.spending025Nr,
        args.spending031Nr,

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
      db.driver.execQuery(deleteByUserIdForTaSpendingList, [args], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectBySpendingSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYSPENDING TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
    LEFT OUTER JOIN TA_FAMILYSPENDING TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const update = 'CALL PW_FAMILYSPENDING_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const deleteByUserIdForTaSpendingList = `
UPDATE
  TA_FAMILYSPENDING
SET
	DEL_FL = 1
WHERE
  HEADUSER_ID = ?
`;
