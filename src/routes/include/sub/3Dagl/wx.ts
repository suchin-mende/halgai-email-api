/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db } from '../../../../db/db';
import { Utils } from '../../../../utils/utils';
import { Settings } from '../../../../config/env/env.local';

const auth = new AuthenticationMiddleware();
const axios = require('axios');
const util = require('util');
/**
 * / route
 *
 * @class Project
 */
export class Wx extends BaseRoute {
  /**
   * Constructor
   *
   * @class 
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class wx
   * @method create
   * @static
   */
  public static create(router: Router) {

    // 绑定微信
    router.post('/:lan/v1/:id/wx/bind', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.code)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      axios
      .get(util.format(Settings.wx.GET_ACCESS_TOKEN_URL, 
          Settings.wx.APPID, Settings.wx.SECRET, params.code)
      )
      .then(async (resp) => {
        let data = resp.data;
        if (!Utils.isEmpty(data.errcode))
          return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });

        await Db.mainDb.models.mUser.updateWxOpenId({
          openId: data.openid,
          serviceId: req.session.user.serviceId,
          userId: req.session.user.userId
        });
        return res.json({ message: 'OK' });
      })
      .catch((err) => {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      });
    });

  }

}
