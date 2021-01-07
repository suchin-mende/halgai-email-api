/**
 * @fileoverview DB handler for the mainDb.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import * as orm from 'orm';
import { Settings } from './../../config/settings';

import { MUser } from '../models/mUser';
import { MConnectionInfo } from '../models/mConnectionInfo';
import { MService } from '../models/mService';
import { MRole } from '../models/mRole';
import { TmpAuth } from '../models/tmpAuth'

import {
  VipPlan,
  Coupon
} from '../models/sub/2Email';

export class MainDb {
  private db: any;
  private _connected: boolean;
  private _error: any;

  public models = {
    mUser: null,
    mConnectionInfo: null,
    mService: null,
    mRole: null,
    tmpAuth: null,
    vipPlan: null,
    coupon: null
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
    this.models.mUser = new MUser(this.db);
    this.models.mConnectionInfo = new MConnectionInfo(this.db);
    this.models.mService = new MService(this.db);
    this.models.mRole = new MRole(this.db);
    this.models.tmpAuth = new TmpAuth(this.db);
    this.models.vipPlan = new VipPlan(this.db);
    this.models.coupon = new Coupon(this.db);
  }
}
