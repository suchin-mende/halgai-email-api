/**
 * @fileoverview DB Model for the arrive_plan.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import { Utils } from '../../../../utils/utils';
import * as Bluebird from 'bluebird';
import { captureRejectionSymbol } from 'events';

export class News {

  constructor() { }

  /**
   * 查询公告条数
   * @param db
   * @param args
   */
  selectCount(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (!args)
        reject();

      let query = selectCountByNews;

      const values = [];
      const where = [];

      where.push('DELETE_FL = 0');

      if (args.newsId) {
        where.push('NEWS_ID = ?');
        values.push(args.newsId);
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
   * 查询公告列表
   * @param db
   * @param args
   */
  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {

      let query = selectByNews;

      const values = [];
      if (args) {
        const where = [];
        where.push('DELETE_FL = 0');

        if (args.newsId) {
          where.push('NEWS_ID = ?');
          values.push(args.newsId);
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
   * 新增公告
   * @param args
   */
  insert (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.newsCd,
        args.newsTx,
        args.startDt,
        args.endDt,
        args.status,
        args.contents,
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
   * 更新公告
   * @param args
   */
  update (db: any, args: any) {
    return new Promise((resolve, reject) => {
      const values = [
        args.newsCd,
        args.newsTx,
        args.startDt,
        args.endDt,
        args.status,
        args.contents,
        args.userId,
        args.userTx,
        args.newsId
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

/**
 * 查询档案SQL
 */
const selectByNews = `
  SELECT
    news.*
  FROM
    R_NEWS as news
`;

/**
 * 查询公告条数SQL
 */
const selectCountByNews = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_NEWS
`;

/**
 * 新增公告SQL
 */
const insert = `
  INSERT INTO
    R_NEWS (
      NEWS_CD,
      NEWS_TX,
      START_DT,
      END_DT,
      STATUS,
      CONTENTS,
      ADDUSER_ID,
      ADDUSER_TX)
  VALUES
	  (?, ?, ?, ?, ?, ?, ?, ?);
`;

/**
 * 更新公告SQL
 */
const update = `
  UPDATE
    R_NEWS
  SET
    NEWS_CD = ?,
    NEWS_TX = ?,
    START_DT = ?,
    END_DT = ?,
    STATUS = ?,
    CONTENTS = ?
  WHERE
    NEWS_ID = ?
`;
