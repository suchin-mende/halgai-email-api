/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';
import { captureRejectionSymbol } from 'events';

export class File {

  constructor() { }

  /**
   * 检索文件条数
   * @param db 
   * @param args 
   */
  selectCount(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (!args)
        reject();

      let query = selectCountByFile;

      const values = [];
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

      if (args.archiveId) {
        where.push('ARCHIVE_ID = ?');
        values.push(args.archiveId);
      }

      if (args.templateId) {
        where.push('TEMPLATE_ID = ?');
        values.push(args.templateId);
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
   * 检索文件
   * @param db 
   * @param args 
   */
  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      
      let query = selectByFile;

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
  
        if (args.archiveId) {
          where.push('ARCHIVE_ID = ?');
          values.push(args.archiveId);
        }

        if (args.templateId) {
          where.push('TEMPLATE_ID = ?');
          values.push(args.templateId);
        }

        if (where.length > 0) {
          query = `${query} WHERE ${where.join(' AND ')}`;
        }

        if (args.colId) {
          query = ` ${query} ORDER BY ${TableUtils.toSnakeCase(args.colId)} ${args.sort || 'asc'}`;
        }

        Utils.args2SqlLimit(args);

        if (args.startRow != null && args.endRow != null) {
          query = ` ${query} LIMIT ${args.startRow},${args.endRow}`;
        }
      }

      console.log(query);
      
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
   * 新增文件
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.projectId,
        args.blockId,
        args.archiveId,
        args.templateId,
        null,
        args.fileTx,
        args.thumbTx,
        args.path,
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
  logicaDeleteWithTemplate (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.templateId
      ];
      db.driver.execQuery(logicaDeleteWithTemplate, values, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data))
        }
      })
    })
  }

}

// 检索文件SQL
const selectByFile = `
  SELECT
    *
  FROM
    R_FILE
`;

// 检索文件条数SQL
const selectCountByFile = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_FILE
`;

// 新增文件SQL
const insert = `
  INSERT INTO 
    R_FILE (PROJECT_ID, BLOCK_ID, ARCHIVE_ID, TEMPLATE_ID, FILE_CD, FILE_TX, THUMBNAIL_TX, FILE_PASS, DELETE_FL, ADDUSER_ID, ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

const logicaDeleteWithTemplate = `
  UPDATE
  R_FILE 
  SET
    DELETE_FL = 1
  WHERE
    TEMPLATE_ID = ?
    AND DELETE_FL = 0
`;