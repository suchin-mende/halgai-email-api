/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class Project {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByProject;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('DELETE_FL=0');

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
      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

  /**
   * 新增工程
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectCd,
        args.projectTx,
        args.startDt,
        args.endDt,
        args.userId,
        args.userTx
      ];
      db.driver.execQuery(insert, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  /**
   * 更新工程
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectCd,
        args.projectTx,
        args.startDt,
        args.endDt,
        args.projectId
      ];
      db.driver.execQuery(update, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

  delete (db:any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId
      ]
      db.driver.execQuery(delProject, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

}

const selectByProject = `
  SELECT
    *
  FROM
    M_PROJECT
`;

/**
 * 新增目录SQL
 */
const insert = `
  INSERT INTO
    M_PROJECT (
      PROJECT_CD,
      PROJECT_TX,
      START_DT,
      END_DT,
      ADDUSER_ID,
      ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?);
`;

/**
 * 更新目录SQL
 */
const update = `
  UPDATE
    M_PROJECT
  SET
    PROJECT_CD = ?,
    PROJECT_TX = ?,
    START_DT = ?,
    END_DT = ?
  WHERE
    PROJECT_ID = ?
`;

/**
 * delete project
 */
const delProject = `
  UPDATE
    M_PROJECT
  SET
    DELETE_FL = 1
  WHERE
    PROJECT_ID = ?
`;
