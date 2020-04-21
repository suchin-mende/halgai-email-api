/**
 * @fileoverview DB handler for the mainDb.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as orm from 'orm';
import { Settings } from './../../config/settings';

import { MaUser } from '../models/maUser';
import { MaConnectionInfo } from '../models/maConnectionInfo';
import { MaLogicalWh } from '../models/maLogicalwh';
import { MaRole } from '../models/maRole';

export class MainDb {
  private db: any;
  private _connected: boolean;
  private _error: any;

  public models = {
    maUser: null,
    maConnectionInfo: null,
    maLogicalWh: null,
    maRole: null
  }

  constructor() {
    orm.connect(Settings.maindb, (err, db) => {
      if (err) {
        this._connected = false;
        this._error = err;
      } else {
        this._connected = true;
        this.db = db;
        this.setModels();
      }
    });
  }

  private setModels() {
    this.models.maUser = new MaUser(this.db);
    this.models.maConnectionInfo = new MaConnectionInfo(this.db);
    this.models.maLogicalWh = new MaLogicalWh(this.db);
    this.models.maRole = new MaRole(this.db);
  }
}