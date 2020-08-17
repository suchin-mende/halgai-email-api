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

  selectCount(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (!args)
        reject();

      let query = selectCountByFile;

      const values = [];
      const where = [];

      where.push('DELETE_FL = 0');
      where.push('PROJECT_ID = ?');
      where.push('BLOCK_ID = ?');
      where.push('ARCHIVE_ID = ?');

      values.push(args.projectId);
      values.push(args.blockId);
      values.push(args.archiveId);

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

  select(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      
      let query = selectByFile;

      const values = [];
      if (args) {
        const where = [];
        where.push('DELETE_FL = 0');

        where.push('PROJECT_ID = ?');
        where.push('BLOCK_ID = ?');
        where.push('ARCHIVE_ID = ?');

        values.push(args.projectId);
        values.push(args.blockId);
        values.push(args.archiveId);

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

}

const selectByFile = `
  SELECT
    *
  FROM
    R_FILE
`;

const selectCountByFile = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_FILE
`;
