/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';

export class Block {

  constructor() { }

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByBlock;
      const values = [];
      if (args) {
        let filterModel;
        if (args.filterModel && Utils.isJSON(args.filterModel)) {
          filterModel = JSON.parse(args.filterModel);
        }
        const where = [];
        where.push('BLOCK.DELETE_FL=0');

        if (args.projectId) {
          where.push('BLOCK.PROJECT_ID = ?');
          values.push(args.projectId);
        }
        if (args.blockId) {
          where.push('BLOCK.BLOCK_ID = ?');
          values.push(args.blockId);
        }
        if (args.parentBlockId) {
          where.push('BLOCK.PARENT_BLOCK_ID = ?');
          values.push(args.parentBlockId);
        }
        if (args.type) {
          where.push('BLOCK.TYPE = ?');
          values.push(args.type);
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
   * 新增目录
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId,
        args.blockCd,
        args.blockTx,
        args.parentBlockId,
        args.templateFl,
        args.type,
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
   * 更新目录
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.blockCd,
        args.blockTx,
        args.parentBlockId,
        args.templateFl,
        args.type,
        args.blockId
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

}

const selectByBlock = `
  SELECT
    BLOCK.PROJECT_ID,
    PROJECT.PROJECT_TX,
    BLOCK.BLOCK_ID,
    BLOCK.BLOCK_CD,
    BLOCK.BLOCK_TX,
    BLOCK.PARENT_BLOCK_ID,
    BLOCK1.BLOCK_TX AS PARENT_BLOCK_TX,
    BLOCK.TEMPLATE_FL,
    BLOCK.TYPE,
    (SELECT count(PARENT_BLOCK_ID) from M_BLOCK where PARENT_BLOCK_ID=BLOCK.BLOCK_ID) AS SUB_BLOCK_CNT,
    (SELECT count(BLOCK_ID) from R_ARCHIVE where PROJECT_ID=BLOCK.PROJECT_ID AND BLOCK_ID=BLOCK.BLOCK_ID) AS ARCHIVE_CNT,
    BLOCK.ADD_DT,
    BLOCK.ADDUSER_ID,
    BLOCK.ADDUSER_TX
  FROM
    M_BLOCK BLOCK
    LEFT JOIN M_PROJECT PROJECT ON BLOCK.PROJECT_ID = PROJECT.PROJECT_ID
    LEFT JOIN M_BLOCK BLOCK1 ON BLOCK.PARENT_BLOCK_ID = BLOCK1.BLOCK_ID
`;

/**
 * 新增目录SQL
 */
const insert = `
  INSERT INTO
    M_BLOCK (
      PROJECT_ID,
      BLOCK_CD,
      BLOCK_TX,
      PARENT_BLOCK_ID,
      TEMPLATE_FL,
      TYPE,
      ADDUSER_ID,
      ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?, ?, ?);
`;

/**
 * 更新目录SQL
 */
const update = `
  UPDATE
    M_BLOCK
  SET
    BLOCK_CD = ?,
    BLOCK_TX = ?,
    PARENT_BLOCK_ID = ?,
    TEMPLATE_FL = ?,
    TYPE = ?
  WHERE
    BLOCK_ID = ?
`;
