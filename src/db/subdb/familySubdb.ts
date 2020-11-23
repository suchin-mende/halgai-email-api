/**
 * @fileoverview DB handler for the subDBs.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as orm from 'orm';
import * as Bluebird from 'bluebird';

import { Common } from '../models/sub/0Common/common';
//Malajahui-api
import { Owner } from '../models/sub/1Family/owner';
import { FamilyUsers } from '../models/sub/1Family/familyUsers';
import { FamilyBasics } from '../models/sub/1Family/familyBasics';
import { FamilyAquacul } from '../models/sub/1Family/familyAquacul';
import { FamilyGrass } from '../models/sub/1Family/familyGrass';
import { FamilyIncome } from '../models/sub/1Family/familyIncome';
import { FamilyInsurance } from '../models/sub/1Family/familyInsurance';
import { FamilyLive } from '../models/sub/1Family/familyLive';
import { FamilyLoan } from '../models/sub/1Family/familyLoan';
import { FamilyOther } from '../models/sub/1Family/familyOther';
import { FamilyProject } from '../models/sub/1Family/familyProject';
import { FamilyShed } from '../models/sub/1Family/familyShed';
import { FamilySpending } from '../models/sub/1Family/familySpending';
import { FamilyUnesco } from '../models/sub/1Family/familyUnesco';

export class Subdb1 {
  private static subdb = {};

  /**
   * Add the tables to be used by the Subdb class
   */
  public static common = new Common();
  //Malajahui-api
  public static owner = new Owner();
  public static familyUsers = new FamilyUsers();
  public static familyBasics = new FamilyBasics();
  public static familyAquacul = new FamilyAquacul();
  public static familyGrass = new FamilyGrass();
  public static familyIncome = new FamilyIncome();
  public static familyInsurance = new FamilyInsurance();
  public static familyLive = new FamilyLive();
  public static familyLoan = new FamilyLoan();
  public static familyOther = new FamilyOther();
  public static familyProject = new FamilyProject();
  public static familyShed = new FamilyShed();
  public static familySpending = new FamilySpending();
  public static familyUnesco = new FamilyUnesco();


  constructor() { }

  public static getSubdb(dbInfo: any): Bluebird {
    return new Bluebird((resolve, reject) => {
      if (this.subdb[dbInfo.connectionCd] !== undefined) {
        resolve(this.subdb[dbInfo.connectionCd].db);
      } else {
        const dbSettings = {
          protocol: 'mysql',
          query: { pool: true, multipleStatements: true },
          host: 'localhost',//dbInfo.dbUrlTx.replace('jdbc:mariadb:aurora//', '').replace(/.$/, ''),
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
