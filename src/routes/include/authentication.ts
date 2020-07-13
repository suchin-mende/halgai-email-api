/**
 * @fileoverview Authentication route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../route';
import { ErrorUtils } from '../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../authenticate/authenticationMiddleware';
import { Logger } from '../../utils/logger';
import { Db2 } from '../../db/db';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class Authentication
 */
export class Authentication extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class Authentication
   * @method create
   * @static
   */
  public static create(router: Router) {
    //add login route
    router.post('/:lan/v1/:id/auth/login', (req: any, res: Response, next: NextFunction) => {
      if (req.body.userCd) {
        req.body.userCd = JSON.stringify({ userCd: req.body.userCd, companyCd: req.params.id });
      }
      passport.authenticate('local', (err, user, info) => {
        let lang = req.params.lan ? req.params.lan : 'cn';
        if (err) {
          const errJson = { errors: [err]};
          return res.status(400).json(errJson);
        }
        if (!user) {
          const err = {
            errors: [
              ErrorUtils.getErrorJson(lang, 'error_invalid_loginid_password')
            ]
          };
          Logger.log('error', `${req.ip} - Invalid user: ${req.body.userCd}`);
          return res.status(400).json(err);
        }
        req.session.user = user;
        req.session.save(err => {
          if (err) {
            const err = {
              errors: [
                ErrorUtils.getErrorJson(lang, 'error_saving_session')
              ]
            };
            return res.status(400).json(err);
          }
        });
        const ret = {
          sessionKey: req.session.id,
          csrfToken: user.csrfTx,
          refreshKey: req.session.id,
          user: {
            userId: user.userId,
            userCd: user.userCd,
            userTx: user.userTx,
            langTx: user.langTx,
            roleId: user.roleId,
            roleTx: user.roleTx,
            serviceId: user.serviceId,
            serviceTx: user.serviceTx,
            addDt: user.addDt,
            updDt: user.updDt,
            upduserId: user.upduserId,
            upduserTx: user.upduserTx,
            adduserId: user.adduserId,
            adduserTx: user.adduserTx
          },
          company: {
            companyId: user.companyId,
            companyCd: user.companyCd,
            companyTx: user.companyTx
          }
        };
        Logger.log('info', `${req.ip} - Login user: ${user.userId} - User code: ${user.userCd}`);
        return res.json(ret);
      })(req, res, next);
    });

    router.post('/:lan/v1/:id/auth/logout', (req: any, res: Response, next: NextFunction) => {
      req.logout();
      req.session.destroy();
      res.status(204).end();
    });

    router.get('/:lan/v1/:id/auth/csrf', auth.auth, (req: any, res: Response, next: NextFunction) => {
      res.json({ csrfToken: req.session.user.csrfTx });
    });

    router.post('/:lan/v1/:id/authCd', async(req: any, res: Response, next: NextFunction) => {
      Logger.log('info', `${req.ip} - request authCd ${req.tel}`);
      let lang = req.params.lan ? req.params.lan : 'cn';
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_http_body_required_jsondata')] });
      }

      //authCd生成
      var _ = require('underscore');
      var authCd = _.map(_.range(0, 1000000), function (n) { return _.pad(n, 6, '0'); });
      //TODO: ここにSMS認証SDKと接続する(authCdを携帯に送信する)

      const query = {
        serviceId: req.body.serviceId,
        lang: lang,
        userCd: req.body.userCd,
        telTx: req.body.tel,
        authCd: authCd
      };

      try {
        Logger.log('info', `${req.ip} - request authCd success: ${req.tel}`);
        await Db2.mainDb.models.tmpAuth.insert(query);
        return res.json({ message: 'OK', authCd: authCd });
      } catch (err) {
        Logger.log('error', `${req.ip} - request authCd error: ${req.tel}`);
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

  /**
   * Constructor
   *
   * @class Authentication
   * @constructor
   */
  constructor() {
    super();
  }

}
