/**
 * @fileoverview DB Model for common procedures.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../../../tableUtils';
import * as Bluebird from 'bluebird';

export class Common {
  constructor() { }

  getTrnId(db: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      const query = 'select SEQ_TRN_ID()';
      db.driver.execQuery(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]['SEQ_TRN_ID()']);
        }
      });
    });
  }

  getPwTtrnid(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      const values = [
        args.companyId,
        args.logicalwhId
      ];
      db.driver.execQuery(PwTtrnid, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const result = TableUtils.formatOutSP(data);
          resolve(TableUtils.toCamelCase(result[0]));
        }
      });
    });
  }

  insertSelectId(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let parameter1Tx = '';
      if (args.parameter1Tx !== undefined) {
        parameter1Tx = args.parameter1Tx;
      }
      const values = [
        args.trnId,
        args.selectId,
        parameter1Tx
      ];
      db.driver.execQuery(pwTmpSelectIdIns2, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }

  insertSelectCd(db: any, args: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      let selectId = 0;
      if (args.selectId !== undefined) {
        selectId = args.selectId;
      }
      let parameter1Tx = '';
      if (args.parameter1Tx !== undefined) {
        parameter1Tx = args.parameter1Tx;
      }
      const values = [
        args.trnId,
        args.selectCd,
        selectId,
        parameter1Tx
      ];
      db.driver.execQuery(pwTmpSelectCdIns2, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(TableUtils.toCamelCase(data));
        }
      });
    });
  }
}

const PwTtrnid = `
CALL PW_TRNID_Get(?,?,@oTRN_ID);
select @oTRN_ID;`;

const pwTmpSelectIdIns2 = 'CALL PW_TMP_SELECTID_Ins2(?,?,?)';
const pwTmpSelectCdIns2 = 'CALL PW_TMP_SELECTCD_Ins2(?,?,?,?)';
