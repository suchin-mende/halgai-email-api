/**
 * @fileoverview DB Model for the M_CONNECTION_INFO table.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as Promise from 'bluebird';
import * as camelcase from 'camelcase-keys-deep';

export class MConnectionInfo {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  select(args?: any) {
    return new Promise((resolve, reject) => {
      let query = getInfo;
      const values = [];
      if (args) {
        query = `${getInfo} WHERE CONNECTION_CD=?`;
        values.push(args.connectionCd);
      }
      this.db.driver.execQuery(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(camelcase(data));
        }
      });
    });
  }
}

const getInfo = `
SELECT
  *
FROM
  M_CONNECTION_INFO
`;
