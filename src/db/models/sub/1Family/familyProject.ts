/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class FamilyProject {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByProjectSearchForm;
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
        if (args.projects01Tx) {
          where.push(' TF.PROJECT01_TX=?');
          values.push(args.projects01Tx);
        }
        if (args.projects02Tx) {
          where.push(' TF.PROJECT02_TX=?');
          values.push(args.projects02Tx);
        }
        if (args.projects03Tx) {
          where.push(' TF.PROJECT03_TX=?');
          values.push(args.projects03Tx);
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
        if (args.projects01Tx) {
          where.push(' TF.PROJECT01_TX=?');
          values.push(args.projects01Tx);
        }
        if (args.projects02Tx) {
          where.push(' TF.PROJECT02_TX=?');
          values.push(args.projects02Tx);
        }
        if (args.projects03Tx) {
          where.push(' TF.PROJECT03_TX=?');
          values.push(args.projects03Tx);
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
        args.familyProjectId,

        args.familyCd,

        args.headuserId,
        args.headuserTx,

        args.project01Tx,
        args.project02Tx,

        args.project03Tx,
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
      db.driver.execQuery(deleteByUserIdForTaProjectList, [args], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectByProjectSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYPROJECT TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
    LEFT OUTER JOIN TA_FAMILYPROJECT TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const update = 'CALL PW_FAMILYPROJECT_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const deleteByUserIdForTaProjectList = `
UPDATE
  TA_FAMILYPROJECT
SET
	DEL_FL = 1
WHERE
  HEADUSER_ID = ?
`;
