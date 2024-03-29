/**
 * @fileoverview DB handler for the subDBs.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as orm from 'orm';
import * as Bluebird from 'bluebird';

import { Common } from '../models/sub/0Common/common';
//Dagl-api
import { Project } from '../models/sub/3Dagl/project';

export class Subdb3 {
  private static subdb = {};

  /**
   * Add the tables to be used by the Subdb class
   */
  public static common = new Common();

  public static project = new Project();


  constructor() { }

  public static getSubdb(dbInfo: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (this.subdb[dbInfo.connectionCd] !== undefined) {
        resolve(this.subdb[dbInfo.connectionCd].db);
      } else {
        const dbSettings = {
          protocol: 'mysql',
          query: { pool: true, multipleStatements: true },
          host: dbInfo.dbUrlTx.replace('jdbc:mariadb:aurora//', '').replace(/.$/, ''),
          database: dbInfo.dbSchemaTx,
          user: dbInfo.dbUsernameTx,
          password: dbInfo.dbPasswordTx
        };
        orm.connect(dbSettings, (err, db) => {
          if (err) {
            reject(err);
          } else {
            this.subdb[dbInfo.connectionCd] = { db: db };
            resolve(this.subdb[dbInfo.connectionCd].db);
          }
        });
      }
    });
  }
}
