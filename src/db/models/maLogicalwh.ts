/**
 * @fileoverview DB Model for the MA_LOGICAL_WH table.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as Promise from 'bluebird';
import * as camelcase from 'camelcase-keys-deep';

export class MaLogicalWh {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  select(args?: any) {
    return new Promise((resolve, reject) => {
      let query = selectQuery;
      const values = [];
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

const selectQuery = `
SELECT
  LOGICAL_WH_ID,
  LOGICAL_WH_TX,
  UPDUSER_ID,
  UPDUSER_TX,
  UPD_DT,
  ADDUSER_ID,
  ADDUSER_TX,
  ADD_DT
FROM
  MA_LOGICAL_WH
`;