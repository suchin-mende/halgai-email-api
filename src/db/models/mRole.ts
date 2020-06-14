/**
 * @fileoverview DB Model for the M_Role table.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as Promise from 'bluebird';
import * as camelcase from 'camelcase-keys-deep';

export class MRole {
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
  ROLE_ID,
  ROLE_TX,
  DESCRIPTION_TX,
  UPDUSER_ID,
  UPDUSER_TX,
  UPD_DT,
  ADDUSER_ID,
  ADDUSER_TX,
  ADD_DT
FROM
  M_ROLE
`;
