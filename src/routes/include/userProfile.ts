/**
 * @fileoverview User route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../route';
import { ErrorUtils } from '../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../authenticate/authenticationMiddleware';
import { Db } from '../../db/db';
import { Logger } from '../../utils/logger';
import { Settings } from '../../config/settings';
import { Utils } from '../../utils/utils';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
const axios = require('axios');
/**
 * / route
 *
 * @class User
 */
export class UserProfile extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class User
   * @method create
   * @static
   */
  public static create(router: Router) {

    /**
     * 个人信息
     */
    router.get('/:lan/v1/:id/user/profile', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const { serviceId, userId } = req.session.user
      let userProfile = null;
      try {
        if (serviceId === 1)
          userProfile = await Db.mainDb.models.mUser.mailUserProfile(serviceId, userId)
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }

      if (userProfile == null)
        return res.status(404).send({ errors: [{ message: 'NotFound', code: ErrorUtils.getDefaultErrorCode() }] });

      userProfile['avatar'] = '';
      userProfile['wxBind'] = userProfile['wOpenId'] != null;
      userProfile['isVip'] = userProfile['vipFl'] !== 0;
      (!userProfile['isVip']) && (delete userProfile.vipFromDt && delete userProfile.vipToDt);

      delete userProfile.wOpenId;
      delete userProfile.vipFl;

      return res.json(userProfile);
    });

  }

  /**
   * Constructor
   *
   * @class User
   * @constructor
   */
  constructor() {
    super();
  }
}
