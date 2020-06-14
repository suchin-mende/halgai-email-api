/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';
import { Logger } from '../../../../utils/logger';

export class FamilyGrass {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByGrassSearchForm;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('TU.DEL_FL=0');
        where.push('TU.OWNER_FL=1');
        Logger.log("info", args.ownerId);
        // if (args.ownerId) {
        //   where.push(' TU.OWNER_ID=?');
        values.push(args.ownerId);
        // }
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
        if (args.grass01Nr) {
          where.push(' TF.GRASS01_NR=?');
          values.push(args.grass01Nr);
        }
        if (args.grass011Nr) {
          where.push(' TF.GRASS011_NR=?');
          values.push(args.grass011Nr);
        }
        if (args.grass012Nr) {
          where.push(' TF.GRASS012_NR=?');
          values.push(args.grass012Nr);
        }
        if (args.grass013Nr) {
          where.push(' TF.GRASS013_NR=?');
          values.push(args.grass013Nr);
        }
        if (args.grass014Nr) {
          where.push(' TF.GRASS014_NR=?');
          values.push(args.grass014Nr);
        }
        if (args.grass015Nr) {
          where.push(' TF.GRASS015_NR=?');
          values.push(args.grass015Nr);
        }
        if (args.grass016Nr) {
          where.push(' TF.GRASS016_NR=?');
          values.push(args.grass016Nr);
        }
        if (args.grass02Nr) {
          where.push(' TF.GRASS02_NR=?');
          values.push(args.grass01Nr);
        }
        if (args.grass021Nr) {
          where.push(' TF.GRASS021_NR=?');
          values.push(args.grass021Nr);
        }
        if (args.grass03Nr) {
          where.push(' TF.GRASS03_NR=?');
          values.push(args.grass03Nr);
        }
        if (args.grass031Nr) {
          where.push(' TF.GRASS031_NR=?');
          values.push(args.grass031Nr);
        }
        if (args.grass032Nr) {
          where.push(' TF.GRASS032_NR=?');
          values.push(args.grass032Nr);
        }
        if (args.grass033Nr) {
          where.push(' TF.GRASS033_NR=?');
          values.push(args.grass033Nr);
        }
        if (args.grass034Nr) {
          where.push(' TF.GRASS034_NR=?');
          values.push(args.grass034Nr);
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
        // if (args.ownerId) {
        //   where.push(' TU.OWNER_ID=?');
        values.push(args.ownerId);
        // }
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
        if (args.grass01Nr) {
          where.push(' TF.GRASS01_NR=?');
          values.push(args.grass01Nr);
        }
        if (args.grass011Nr) {
          where.push(' TF.GRASS011_NR=?');
          values.push(args.grass011Nr);
        }
        if (args.grass012Nr) {
          where.push(' TF.GRASS012_NR=?');
          values.push(args.grass012Nr);
        }
        if (args.grass013Nr) {
          where.push(' TF.GRASS013_NR=?');
          values.push(args.grass013Nr);
        }
        if (args.grass014Nr) {
          where.push(' TF.GRASS014_NR=?');
          values.push(args.grass014Nr);
        }
        if (args.grass015Nr) {
          where.push(' TF.GRASS015_NR=?');
          values.push(args.grass015Nr);
        }
        if (args.grass016Nr) {
          where.push(' TF.GRASS016_NR=?');
          values.push(args.grass016Nr);
        }
        if (args.grass02Nr) {
          where.push(' TF.GRASS02_NR=?');
          values.push(args.grass01Nr);
        }
        if (args.grass021Nr) {
          where.push(' TF.GRASS021_NR=?');
          values.push(args.grass021Nr);
        }
        if (args.grass03Nr) {
          where.push(' TF.GRASS03_NR=?');
          values.push(args.grass03Nr);
        }
        if (args.grass031Nr) {
          where.push(' TF.GRASS031_NR=?');
          values.push(args.grass031Nr);
        }
        if (args.grass032Nr) {
          where.push(' TF.GRASS032_NR=?');
          values.push(args.grass032Nr);
        }
        if (args.grass033Nr) {
          where.push(' TF.GRASS033_NR=?');
          values.push(args.grass033Nr);
        }
        if (args.grass034Nr) {
          where.push(' TF.GRASS034_NR=?');
          values.push(args.grass034Nr);
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
        args.familyGarassId,
        args.familyCd,

        args.headuserId,
        args.headuserTx,
        args.grass01Nr,
        args.grass011Nr,
        args.grass012Nr,

        args.grass013Nr,
        args.grass014Nr,
        args.grass015Nr,
        args.grass016Nr,
        args.grass02Nr,

        args.grass03Nr,
        args.grass031Nr,
        args.grass032Nr,
        args.grass033Nr,
        args.grass034Nr,

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
      db.driver.execQuery(deleteByUserIdForTaGrassList, [args], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

}

const selectByGrassSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYGRASS TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TF.OWNER_ID = ?
      AND TU.DEL_FL = TF.DEL_FL
`;

const selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
    LEFT OUTER JOIN TA_FAMILYGRASS TF
      ON TU.FAMILY_CD = TF.FAMILY_CD
      AND TU.DEL_FL = TF.DEL_FL
      AND TF.OWNER_ID = ?
`;

const update = 'CALL PW_FAMILYGRASS_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
const deleteByUserIdForTaGrassList = `
UPDATE
  TA_FAMILYGRASS
SET
	DEL_FL = 1
WHERE
  HEADUSER_ID = ?
`;
