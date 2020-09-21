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
import { Db } from '../../db/db';
import { Utils } from '../../utils/utils'
import { Settings } from '../../config/env/env.local';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
const bcrypt = require('bcrypt');
const axios = require('axios');
const util = require('util');
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
        req.body.userCd = JSON.stringify({
          userCd: req.body.userCd,
          companyCd: req.params.id,
          serviceId: req.headers.h_service_id });
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
        console.log(req.session);
        bcrypt.compare(req.headers.h_api_key_tx, user.apiKeyTx, (err, isValid) => {
          if (err) {
            const err = {
              errors: [
                ErrorUtils.getErrorJson(lang, 'error_invalid_apikey')
              ]
            };
            return res.status(400).json(err);
          }
          if (!isValid) {
            const err = {
              errors: [
                ErrorUtils.getErrorJson(lang, 'error_invalid_apikey')
              ]
            };
            return res.status(400).json(err);
          } else {
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
          }
        });
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

    //認証コードを取得する
    router.post('/:lan/v1/:id/authCd', async(req: any, res: Response, next: NextFunction) => {
      let lang = req.params.lan ? req.params.lan : 'cn';
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_http_body_required_jsondata')] });
      }

      try {
        //authCd生成
        var authCd = Utils.getRandom(100000, 999999);
        var telNo = req.body.tel;

        const query = {
          serviceId: req.body.serviceId,
          langTx: lang,
          userCd: req.body.userCd,
          telTx: telNo,
          authCd: authCd,
        }


        if (telNo === "99999") {
          let user = await Db.mainDb.models.mUser.getUsers({ userCd: req.body.userCd });
          if (user.length == 0) {
            return res.status(400).send({
              errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_usercd')]
            });
          } else {
            telNo = query.telTx = user[0].tel;
          }
        }

        await Db.mainDb.models.tmpAuth.insert(query);

        //TODO: 国番号と電話番号の組合せが正しいかチェックが必要か
        //TODO: telNoにSMS送信
        console.log(telNo);

        return res.json({ message: 'OK', authCd: authCd });
      } catch (err) {
        Logger.log('error', `${req.ip} - request authCd error`);
        return res
          .status(400)
          .send({
            errors: [
              {
                message: err.sqlMessage,
                code: ErrorUtils.getDefaultErrorCode(),
              },
            ],
          });
      }
    });

    // 微信登录
    router.post('/:lan/v1/:id/auth/wx/login', async (req: any, res: Response, next: NextFunction) => {
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

        const users = await Db.mainDb.models.mUser.getUsers({
          serviceId: req.headers.h_service_id,
          openId: data.openid
        });

        if (users == null || users.length == 0)
          return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
        
        let user = users[0];
        req.session.user = user;

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
      })
      .catch((err) => {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      });
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
