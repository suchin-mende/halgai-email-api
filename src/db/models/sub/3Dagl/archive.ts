/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';
import { captureRejectionSymbol } from 'events';

export class Archive {

  constructor() { }

  /**
   * 查询档案条数
   * @param db
   * @param args
   */
  selectCount(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (!args)
        reject();

      let query = selectCountByArchive;

      const values = [];
      const where = [];

      where.push('DELETE_FL = 0');
      where.push('PROJECT_ID = ?');
      where.push('BLOCK_ID = ?');

      values.push(args.projectId);
      values.push(args.blockId);

      if (args.archiveId) {
        where.push('ARCHIVE_ID = ?');
        values.push(args.archiveId);
      }

      if (args.archiveTx) {
        where.push('ARCHIVE_TX = ?');
        values.push(args.archiveTx);
      }

      if (where.length > 0) {
        query = `${query} WHERE ${where.join(' AND ')}`;
      }
      console.log(query);

      db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0].totalCount);
        }
      });
    });
  }

  /**
   * 查询档案列表
   * @param db
   * @param args
   */
  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {

      let query = selectByArchive;

      const values = [];
      if (args) {
        const where = [];
        where.push('DELETE_FL = 0');

        where.push('PROJECT_ID = ?');
        where.push('BLOCK_ID = ?');

        values.push(args.projectId);
        values.push(args.blockId);

        if (args.archiveId) {
          where.push('ARCHIVE_ID = ?');
          values.push(args.archiveId);
        }

        if (args.archiveTx) {
          where.push('ARCHIVE_TX = ?');
          values.push(args.archiveTx);
        }

        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }

        if (args.colId) {
          query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`;
        }

        if (args.startRow != null && args.endRow != null) {
          query = ` ${query} LIMIT ${args.startRow},${args.endRow}`;
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
   * 新增档案
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId,
        args.blockId,
        args.archiveCd,
        args.archiveTx,
        1,
        0,
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
   * 更新档案
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId,
        args.blockId,
        args.archiveCd,
        args.archiveTx,
        args.stateFl,
        args.userId,
        args.userTx,
        args.archiveId
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

  /**
   * 查询档案状态数
   * @param db
   * @param args
   */
  countArchiveState (db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let query = selectByArchiveState;

      const values = [];
      if (args) {
        const where = [];
        where.push('DELETE_FL = 0');

        if (args.projectId) {
          where.push('PROJECT_ID = ?');
          values.push(args.projectId);
        }
        if (args.blockId) {
          where.push('BLOCK_ID = ?');
          values.push(args.blockId);
        }

        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }

        if (args.colId) {
          query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`;
        }

        if (args.startRow != null && args.endRow != null) {
          query = ` ${query} LIMIT ${args.startRow},${args.endRow}`;
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

/**
 * 查询档案SQL
 */
const selectByArchive = `
  SELECT
    *
  FROM
  R_ARCHIVE
`;

/**
 * 查询档案条数SQL
 */
const selectCountByArchive = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_ARCHIVE
`;

/**
 * 新增档案SQL
 */
const insert = `
  INSERT INTO
    R_ARCHIVE (PROJECT_ID, BLOCK_ID, ARCHIVE_CD, ARCHIVE_TX, STATE_FL, DELETE_FL, ADDUSER_ID, ADDUSER_TX, UPD_DT, UPDUSER_ID, UPDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL);
`;

/**
 * 更新档案SQL
 */
const update = `
  UPDATE
    R_ARCHIVE
  SET
    PROJECT_ID = ?,
    BLOCK_ID = ?,
    ARCHIVE_CD = ?,
    ARCHIVE_TX = ?,
    STATE_FL = ?,
    UPD_DT = CURRENT_TIMESTAMP,
    UPDUSER_ID = ?,
    UPDUSER_TX = ?
  WHERE
    ARCHIVE_ID = ?
`;

/**
 * 查询档案状态SQL
 */
const selectByArchiveState = `
  SELECT
    COUNT(IF(STATE_FL = 0, 1, NULL)) AS NOT_BEING_CNT,
    COUNT(IF(STATE_FL = 1, 1, NULL)) AS FINISH_CNT,
    COUNT(IF(STATE_FL = 2, 1, NULL)) AS STAGE_CNT
  FROM
    R_ARCHIVE
`;
