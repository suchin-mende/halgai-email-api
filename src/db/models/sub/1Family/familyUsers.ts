/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils'
import { Utils } from '../../../../utils/utils'
import * as Bluebird from 'bluebird'

export class FamilyUsers {
  constructor () {}

  select (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectBySearchForm;
      console.log(args);
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('TU.DEL_FL=0');
        if (args.userId) {
          where.push(' TU.USER_ID=?');
          values.push(args.userId);
        }
        if (args.tuFamilyCd) {
          where.push(' TU.FAMILY_CD=?');
          values.push(args.tuFamilyCd);
        } else if (filterModel && filterModel.tuFamilyCd) {
          where.push(TableUtils.filterModelWhere(filterModel.tuFamilyCd, 'TU.FAMILY_CD'));
          values.push(TableUtils.filterModelValue(filterModel.tuFamilyCd));
        }
        if (args.userTx) {
          where.push(' TU.USER_TX=?');
          values.push(args.userTx);
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'TU.USER_TX'));
          values.push(TableUtils.filterModelValue(filterModel.userTx));
        }
        if (args.ownerFl) {
          where.push(' TU.OWNER_FL=?');
          values.push(args.ownerFl);
        }
        if (args.sexCd) {
          where.push(' TU.SEX_CD=?');
          values.push(args.sexCd);
        }
        if (args.birthDt) {
          where.push(' TU.BIRTH_DT=?');
          values.push(args.birthDt);
        } else if (filterModel && filterModel.birthDt) {
          where.push(TableUtils.filterModelWhere(filterModel.birthDt, 'TU.BIRTH_DT'));
          values.push(TableUtils.filterModelValue(filterModel.birthDt));
        }
        if (args.identification) {
          where.push(' TU.IDENTIFICATION=?');
          values.push(args.identification);
        } else if (filterModel && filterModel.identification) {
          where.push(TableUtils.filterModelWhere(filterModel.identification, 'TU.IDENTIFICATION'));
          values.push(TableUtils.filterModelValue(filterModel.identification));
        }
        if (args.politicalBackfield) {
          where.push(' TU.POLITICAL_BACKFIELD=?');
          values.push(args.politicalBackfield);
        } else if (filterModel && filterModel.politicalBackfield) {
          where.push(TableUtils.filterModelWhere(filterModel.politicalBackfield, 'TU.POLITICAL_BACKFIELD'));
          values.push(TableUtils.filterModelValue(filterModel.politicalBackfield));
        }
        if (args.wenhua) {
          where.push(' TU.WENHUA=?');
          values.push(args.wenhua);
        } else if (filterModel && filterModel.wenhua) {
          where.push(TableUtils.filterModelWhere(filterModel.wenhua, 'TU.WENHUA'));
          values.push(TableUtils.filterModelValue(filterModel.wenhua));
        }
        if (args.telTx) {
          where.push(' TU.TEL_TX=?');
          values.push(args.telTx);
        } else if (filterModel && filterModel.telTx) {
          where.push(TableUtils.filterModelWhere(filterModel.telTx, 'TU.TEL_TX'));
          values.push(TableUtils.filterModelValue(filterModel.telTx));
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
          // query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`;
        }
        if (args.endRow) {
          query = ` ${query} LIMIT ${args.startRow || 0},${args.endRow}`;
        }
      }
      console.log('query==', query);
      console.log('values==', values);

      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      })
    })
  }

  selectBasic (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByBasicSearchForm
      const values = []
      if (args) {
        let filterModel
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel)
        }
        const where = []
        where.push('TU.DEL_FL=0')
        where.push('TU.OWNER_FL=1')
        if (args.userId) {
          where.push(' TU.USER_ID=?')
          values.push(args.userId)
        }
        if (args.familyCd) {
          where.push(' TU.FAMILY_CD=?')
          values.push(args.familyCd)
        } else if (filterModel && filterModel.familyCd) {
          where.push(TableUtils.filterModelWhere(filterModel.familyCd, 'TU.FAMILY_CD'))
          values.push(TableUtils.filterModelValue(filterModel.familyCd))
        }
        if (args.userTx) {
          where.push(' TU.USER_TX=?')
          values.push(args.userTx)
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'TU.USER_TX'))
          values.push(TableUtils.filterModelValue(filterModel.userTx))
        }
        if (args.familypeopleNr) {
          where.push(' TF.FAMILYPEOPLE_NR=?')
          values.push(args.familypeopleNr)
        }
        if (args.labour) {
          where.push(' TF.LABOUR=?')
          values.push(args.labour)
        }
        if (args.muyerenyuan) {
          where.push(' TF.MUYERENYUAN=?')
          values.push(args.muyerenyuan)
        }
        if (args.sumu) {
          where.push(' TF.SUMU=?')
          values.push(args.sumu)
        }
        if (args.gacha) {
          where.push(' TF.GACHA=?')
          values.push(args.gacha)
        }
        if (args.pinkunFl) {
          where.push(' TF.PINKUN_FL=?')
          values.push(args.pinkunFl)
        }
        if (filterModel && filterModel.updDt) {
          if (filterModel.updDt.type === 'inRange') {
            where.push(' UPD_DT >= ?')
            values.push(filterModel.updDt.dateFrom)
            where.push(' UPD_DT <= ?')
            values.push(filterModel.updDt.dateTo)
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.updDt, 'UPD_DT'))
            values.push(TableUtils.filterModelValue(filterModel.updDt))
          }
        }
        if (filterModel && filterModel.addDt) {
          if (filterModel.addDt.type === 'inRange') {
            where.push(' ADD_DT >= ?')
            values.push(filterModel.addDt.dateFrom)
            where.push(' ADD_DT <= ?')
            values.push(filterModel.addDt.dateTo)
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.addDt, 'ADD_DT'))
            values.push(TableUtils.filterModelValue(filterModel.addDt))
          }
        }
        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`
        }
        // Check if there are pagination parameters
        if (args.colId) {
          query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`
        }
        if (args.endRow) {
          query = ` ${query} LIMIT ${args.startRow || 0},${args.endRow}`
        }
      }
      console.log('query=====' + query)
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  count (db: any, args?: any, queryFl?: string) {
    return new Promise((resolve, reject) => {
      let query = selectCount
      const values = []
      if (args) {
        let filterModel
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel)
        }
        const where = []
        where.push('TU.DEL_FL=0')
        if (queryFl) where.push('TU.OWNER_FL=1')
        if (args.userId) {
          where.push(' TU.USER_ID=?')
          values.push(args.userId)
        }
        if (args.familyCd) {
          where.push(' TU.FAMILY_CD=?')
          values.push(args.familyCd)
        } else if (filterModel && filterModel.familyCd) {
          where.push(TableUtils.filterModelWhere(filterModel.familyCd, 'TU.FAMILY_CD'))
          values.push(TableUtils.filterModelValue(filterModel.familyCd))
        }
        if (args.userTx) {
          where.push(' TU.USER_TX=?')
          values.push(args.userTx)
        } else if (filterModel && filterModel.userTx) {
          where.push(TableUtils.filterModelWhere(filterModel.userTx, 'TU.USER_TX'))
          values.push(TableUtils.filterModelValue(filterModel.userTx))
        }
        if (args.ownerFl) {
          where.push(' TU.OWNER_FL=?')
          values.push(args.ownerFl)
        }
        if (args.sexCd) {
          where.push(' TU.SEX_CD=?')
          values.push(args.sexCd)
        }
        if (args.birthDt) {
          where.push(' TU.BIRTH_DT=?')
          values.push(args.birthDt)
        } else if (filterModel && filterModel.birthDt) {
          where.push(TableUtils.filterModelWhere(filterModel.birthDt, 'TU.BIRTH_DT'))
          values.push(TableUtils.filterModelValue(filterModel.birthDt))
        }
        if (args.identification) {
          where.push(' TU.IDENTIFICATION=?')
          values.push(args.identification)
        } else if (filterModel && filterModel.identification) {
          where.push(TableUtils.filterModelWhere(filterModel.identification, 'TU.IDENTIFICATION'))
          values.push(TableUtils.filterModelValue(filterModel.identification))
        }
        if (args.politicalBackfield) {
          where.push(' TU.POLITICAL_BACKFIELD=?')
          values.push(args.politicalBackfield)
        } else if (filterModel && filterModel.politicalBackfield) {
          where.push(TableUtils.filterModelWhere(filterModel.politicalBackfield, 'TU.POLITICAL_BACKFIELD'))
          values.push(TableUtils.filterModelValue(filterModel.politicalBackfield))
        }
        if (args.wenhua) {
          where.push(' TU.WENHUA=?')
          values.push(args.wenhua)
        } else if (filterModel && filterModel.wenhua) {
          where.push(TableUtils.filterModelWhere(filterModel.wenhua, 'TU.WENHUA'))
          values.push(TableUtils.filterModelValue(filterModel.wenhua))
        }
        if (args.telTx) {
          where.push(' TU.TEL_TX=?')
          values.push(args.telTx)
        } else if (filterModel && filterModel.telTx) {
          where.push(TableUtils.filterModelWhere(filterModel.telTx, 'TU.TEL_TX'))
          values.push(TableUtils.filterModelValue(filterModel.telTx))
        }
        if (filterModel && filterModel.updDt) {
          if (filterModel.updDt.type === 'inRange') {
            where.push(' UPD_DT >= ?')
            values.push(filterModel.updDt.dateFrom)
            where.push(' UPD_DT <= ?')
            values.push(filterModel.updDt.dateTo)
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.updDt, 'UPD_DT'))
            values.push(TableUtils.filterModelValue(filterModel.updDt))
          }
        }
        if (filterModel && filterModel.addDt) {
          if (filterModel.addDt.type === 'inRange') {
            where.push(' ADD_DT >= ?')
            values.push(filterModel.addDt.dateFrom)
            where.push(' ADD_DT <= ?')
            values.push(filterModel.addDt.dateTo)
          } else {
            where.push(TableUtils.filterModelWhere(filterModel.addDt, 'ADD_DT'))
            values.push(TableUtils.filterModelValue(filterModel.addDt))
          }
        }
        // Join the strings to build the query
        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`
        }
      }
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data[0]))
        }
      })
    })
  }

  insert (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      const values = [
        args.companyId,
        args.logicalWhId,
        args.ownerId,

        args.familyCd,
        args.familyUserCd,
        args.familyUserTx,
        args.sexCd,
        args.birthDt,

        args.identification,
        args.ownerFl,
        args.politicalBackfield,
        args.wenhua,

        args.telTx,
        args.wechat,
        args.noteTx,

        args.userId,
        args.userTx,
        args.updprogramCd
      ]
      db.driver.execQuery(insert, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  update (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      const values = [
        args.companyId,
        args.logicalWhId,
        args.ownerId,
        args.familyCd,

        args.familyUserId,
        args.familyUserTx,
        args.sexCd,
        args.birthDt,

        args.identification,
        args.ownerFl,
        args.politicalBackfield,
        args.wenhua,

        args.telTx,
        args.wechat,
        args.noteTx,

        args.userId,
        args.userTx,
        args.updprogramCd
      ]
      db.driver.execQuery(update, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  del (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      db.driver.execQuery(deleteByUserIdForTaUserList, [args], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }
}

const selectBySearchForm = `
  SELECT
    *
  FROM
    TA_USER TU
`

const selectByBasicSearchForm = `
  SELECT
    TF.*,
    TU.FAMILY_CD,
    TU.USER_ID,
    TU.USER_TX
  FROM
    TA_USER TU
    LEFT OUTER JOIN TA_FAMILYBASIC TF
			ON TU.FAMILY_CD = TF.FAMILY_CD
`

let selectCount = `
SELECT
  COUNT(*) AS TOTAL
FROM
  TA_USER TU
`

// New
const insert = 'CALL PW_FAMILYUSER_Ins(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const update = 'CALL PW_FAMILYUSER_Upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const deleteByUserIdForTaUserList = `
UPDATE
  TA_USER
SET
	DEL_FL = 1
WHERE
  USER_ID = ?
`
