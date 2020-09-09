/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class Template {

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

      let query = selectCountByTemplate;

      const values = [];
      const where = [];

      where.push('DELETE_FL = 0');

      if (args.templateId) {
        where.push('TEMPLATE_ID = ?');
        values.push(args.templateId);
      }

      if (args.blockId) {
        where.push('BLOCK_ID = ?');
        values.push(args.blockId);
      }

      if (args.templateTx) {
        where.push(`TEMPLATE_TX like \'%${args.templateTx}%\'`);
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

      let query = selectByTemplate;

      const values = [];
      if (args) {
        const where = [];
        where.push('template.DELETE_FL = 0');

        if (args.templateId) {
          where.push('template.TEMPLATE_ID = ?');
          values.push(args.templateId);
        }

        if (args.blockId) {
          where.push('template.BLOCK_ID = ?');
          values.push(args.blockId);
        }

        if (args.templateTx) {
          where.push(`template.TEMPLATE_TX like \'%${args.templateTx}%\'`);
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
      console.log(query)

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
   * 新增模版
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.blockId,
        args.templateCd,
        args.templateTx,
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
   * 更新模版
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.blockId,
        args.templateCd,
        args.templateTx,
        args.templateId
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

  delete (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.templateId
      ];
      db.driver.execQuery(deleteTemplate, values, (err, data) => {
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
 * 查询模版
 */
const selectByTemplate = `
  SELECT
    template.*,
    rfile.FILE_PASS AS filePath,
    rfile.FILE_TX AS fileTx
  FROM
    M_TEMPLATE template
  LEFT JOIN R_FILE rfile
    ON rfile.TEMPLATE_ID = template.TEMPLATE_ID
`;

/**
 * 查询模版条数
 */
const selectCountByTemplate = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    M_TEMPLATE
`;

/**
 * 新增模版SQL
 */
const insert = `
  INSERT INTO
    M_TEMPLATE (BLOCK_ID, TEMPLATE_CD, TEMPLATE_TX, DELETE_FL, ADDUSER_ID, ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?);
`;

/**
 * 更新模版SQL
 */
const update = `
  UPDATE
    M_TEMPLATE
  SET
    BLOCK_ID = ?,
    TEMPLATE_CD = ?,
    TEMPLATE_TX = ?
  WHERE
    TEMPLATE_ID = ?
`;

const deleteTemplate = `
  UPDATE
    M_TEMPLATE
  SET
    DELETE_FL = 1
  WHERE
    TEMPLATE_ID = ?
`;
