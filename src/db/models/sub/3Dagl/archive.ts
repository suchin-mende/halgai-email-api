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

      where.push('archive.DELETE_FL = 0');

      if (args.blockId) {
        where.push('archive.BLOCK_ID = ?')
        values.push(args.blockId)
      }

      if (args.blockCd) {
        where.push(`block.BLOCK_CD like \'%${args.blockCd}%\' `);
      }

      if (args.archiveId) {
        where.push('archive.ARCHIVE_ID = ?');
        values.push(args.archiveId);
      }

      if (args.archiveTx) {
        where.push(`archive.ARCHIVE_TX like \'%${args.archiveTx}%\'`);
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
        where.push('archive.DELETE_FL = 0')

        if (args.blockId) {
          where.push('archive.BLOCK_ID = ?')
          values.push(args.blockId)
        }

        if (args.blockCd) {
          where.push(`block.BLOCK_CD like \'%${args.blockCd}%\' `);
        }

        if (args.archiveId) {
          where.push('archive.ARCHIVE_ID = ?')
          values.push(args.archiveId);
        }

        if (args.archiveTx) {
          where.push(`archive.ARCHIVE_TX like \'%${args.archiveTx}%\'`)
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
        args.blockId,
        args.archiveCd,
        args.archiveTx,
        args.responsible,
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
        args.blockId,
        args.archiveCd,
        args.archiveTx,
        args.responsible,
        args.userId,
        args.userTx,
        args.archiveId,
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

  /**
   * 更新档案状态
   * @param args
   */
  updateState(db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId,
        args.blockId,
        args.archiveId,
        args.stateFl,
        args.userId,
        args.userTx,
        args.projectId,
        args.blockId,
        args.archiveId,
        args.stateFl,
        args.userId,
        args.userTx
      ];
      db.driver.execQuery(updateInsertState, values, (err, data) => {
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

  delete (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.archiveId
      ];
      db.driver.execQuery(deleteArchive, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

}

/**
 * 查询档案SQL
 */
const selectByArchive = `
  SELECT
    archive.ARCHIVE_ID,
    archive.BLOCK_ID,
    block.BLOCK_TX,
    block.TYPE,
    archive.ARCHIVE_TX,
    archive.RESPONSIBLE,
    archive.ADD_DT,
    state.STATE_FL,
    archive.ARCHIVE_CD,
    (
      SELECT COUNT(1) FROM R_FILE where BLOCK_ID = 3 and ARCHIVE_ID = archive.ARCHIVE_ID
    ) as fileTotalCnt
  FROM
    R_ARCHIVE as archive
    LEFT JOIN M_BLOCK block ON archive.BLOCK_ID = block.BLOCK_ID AND block.DELETE_FL = 0
    LEFT JOIN R_ARCHIVE_STATE state ON archive.ARCHIVE_ID = state.ARCHIVE_ID AND state.DELETE_FL = 0
`

/**
 * 查询档案条数SQL
 */
const selectCountByArchive = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_ARCHIVE as archive
    LEFT JOIN M_BLOCK block ON archive.BLOCK_ID = block.BLOCK_ID AND block.DELETE_FL = 0
    LEFT JOIN R_ARCHIVE_STATE state ON archive.ARCHIVE_ID = state.ARCHIVE_ID AND state.DELETE_FL = 0
`;

/**
 * 新增档案SQL
 */
const insert = `
  INSERT INTO
    R_ARCHIVE (BLOCK_ID, ARCHIVE_CD, ARCHIVE_TX, RESPONSIBLE, DELETE_FL, ADDUSER_ID, ADDUSER_TX, UPD_DT, UPDUSER_ID, UPDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL);
`

/**
 * 更新档案SQL
 */
const update = `
  UPDATE
    R_ARCHIVE
  SET
    BLOCK_ID = ?,
    ARCHIVE_CD = ?,
    ARCHIVE_TX = ?,
    RESPONSIBLE = ?,
    UPD_DT = CURRENT_TIMESTAMP,
    UPDUSER_ID = ?,
    UPDUSER_TX = ?
  WHERE
    ARCHIVE_ID = ?
`

/**
 * 更新档案SQL
 */
const updateInsertState = `
  INSERT INTO
    R_ARCHIVE_STATE
    (PROJECT_ID, BLOCK_ID, ARCHIVE_ID, STATE_FL, ADD_DT, ADDUSER_ID, ADDUSER_TX)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
  ON duplicate KEY UPDATE
    PROJECT_ID = ?,
    BLOCK_ID = ?,
    ARCHIVE_ID = ?,
    STATE_FL = ?,
    UPD_DT = CURRENT_TIMESTAMP,
    UPDUSER_ID = ?,
    UPDUSER_TX = ?,
    UPDCOUNT_NR = UPDCOUNT_NR + 1
`

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

const deleteArchive = `
  UPDATE
    R_ARCHIVE
  SET
    DELETE_FL = 1
  WHERE
    ARCHIVE_ID = ?
`;
