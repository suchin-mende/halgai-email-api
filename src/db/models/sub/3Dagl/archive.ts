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

const selectByArchive = `
  SELECT
    *
  FROM
  R_ARCHIVE
`;

const selectCountByArchive = `
  SELECT
    COUNT(1) AS totalCount
  FROM
    R_ARCHIVE
`;
