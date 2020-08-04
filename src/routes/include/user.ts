/**
 * @fileoverview User route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../route';
import { ErrorUtils } from '../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../authenticate/authenticationMiddleware';
import { Db2 } from '../../db/db';
import { Logger } from '../../utils/logger';
import { Settings } from '../../config/settings';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
const axios = require('axios');
/**
 * / route
 *
 * @class User
 */
export class User extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class User
   * @method create
   * @static
   */
  public static create(router: Router) {
    // add users route
    router.get('/:lan/v1/:id/user', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const users = await Db2.mainDb.models.mUser.getUsers(query);
        const total = await Db2.mainDb.models.mUser.count(query);
        return res.json({ users: users, total: total.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.get('/:lan/v1/:id/user/:uid', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const query = {
        serviceId: req.session.user.serviceId,
        userCd: req.params.uid
      };
      try {
        const user = await Db2.mainDb.models.mUser.getUsers(query);
        return res.json({ users: user});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/:lan/v1/:id/ckuser', async (req: any, res: Response, next: NextFunction) => {
      const query = {
        userCd: req.body.userCd
      };
      try {
        const user = await Db2.mainDb.models.mUser.getUsers(query);
        return res.json({ user: user.userCd });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/:lan/v1/:id/user', async (req: any, res: Response, next: NextFunction) => {
      let lang = req.params.lan ? req.params.lan : 'cn';
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_http_body_required_jsondata')] });
      }
      console.log(req.headers['APP_ID']);
      if (!req.body.authCd) {
        return res
          .status(400)
          .send({
            errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_authcd')],
          })
      }
      const query = {
        companyId: req.body.companyId,
        serviceId: req.body.serviceId,
        langTx: lang,
        userCd: req.body.userCd,
        password: req.body.passwordTx,
        telTx: req.body.tel,
        authCd: req.body.authCd,
        vipPlanCd: req.body.vipPlanCd ? req.body.vipPlanCd : 0
      };
      try {
        const result = await Db2.mainDb.models.tmpAuth.getTmpAuth(query);
        if (!result || result.authCd !== req.body.authCd) {
          return res.json({
            errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_authcd')]
          });
        } else {
          await Db2.mainDb.models.mUser.insert(query);
          await Db2.mainDb.models.tmpAuth.delete(query);


          //Emailアカウントを用意する
          if (req.body.serviceId == 1)
          {
            const pladata = {
              "uid": req.body.userCd,
              "pass": req.body.passwordTx,
              "add": '',
              "quota": '100'
            };
            if (req.body.vipPlanCd == "1") {
              pladata.quota = Settings.vipPlan.nomalQuota;
            } else if (req.body.vipPlanCd == "2") {
              pladata.quota = Settings.vipPlan.premiumQuota;
            } else if (req.body.vipPlanCd == "3") {
              pladata.quota = Settings.vipPlan.FirstQuota;
            }
            const params = new URLSearchParams();
            Object.keys(pladata).forEach(function (key) {
              params.append(key, this[key]);
            }, pladata);
            axios
              .post(Settings.pdslApiDomain + '/halgai_api.php', params, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
              .then((respla) => {
                Logger.log('info', req.body.userCd + " add email account " + respla.data);
              })
              .catch((errpla) => {
                Logger.log('error', 'add email account error.');
                Logger.log('info', req.body.userCd + " add email error " + errpla);
              });
          }

          //TODO:MMailにログインして正しいURLを返す


          return res.json({ message: 'OK', url: Settings.emailServerDomain + '/?/login'})
        }
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/:lan/v1/:id/user', async (req: any, res: Response, next: NextFunction) => {
      let lang = req.params.lan ? req.params.lan : 'cn';
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.body.companyId,
        serviceId: req.body.serviceId,
        langTx: lang,
        password: req.body.password,
        mail: req.body.mail,
        countryCd: req.body.countryCd,
        tel: req.body.tel,
        myNo: req.body.myNo,
        sex: req.body.sex,
        wechatCd: req.body.wechatCd,

        userId: req.body.userId,
        userTx: req.body.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const result = await Db2.mainDb.models.mUser.update(query);
        await Db2.mainDb.models.tmpAuth.delete(query);
        return res.json({ message: 'OK', userId: result.id });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/user/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        userCd: req.body.userCd
      };
      try {
        await Db2.mainDb.models.mUser.delete(query);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/:lan/v1/:id/user/forgotpw', async (req: any, res: Response, next: NextFunction) => {
      let lang = req.params.lan ? req.params.lan : 'cn';
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_http_body_required_jsondata')] });
      }

      try {
        //認証コードチェック
        let authCheck = await Db2.mainDb.models.tmpAuth.getTmpAuth({
          userCd: req.body.userCd,
          authCd: req.body.authCd
        });

        if (!authCheck)
          return res.status(400).send({
            errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_authcd')]
          });

        //userチェック
        let user = await Db2.mainDb.models.mUser.getUsers({ userCd: req.body.userCd, tel: authCheck.tel });
        user = user[0];
        console.log(user.tel);
        if (!user || authCheck.tel != user.tel)
          return res.status(400).send({
            errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_usercd')]
          });

        const query = {
          userId: user.userId,
          serviceId: user.serviceId,
          userTx: user.userTx,
          langTx: lang,
          password: req.body.newPW,
          mail: user.mail,
          lockFl: user.lockFl,
          resetFl: user.resetFl,
          countryCd: user.countryCd,
          tel: user.tel,
          myNo: user.myNo,
          sex: user.sex,
          wechatCd: user.wechatCd,
          updprogramCd: "Email"
        }

        await Db2.mainDb.models.mUser.update(query);
        return res.json({ message: 'OK' })
      } catch (err) {
        return res
          .status(400)
          .send({
            errors: [
              {
                message: err.sqlMessage,
                code: ErrorUtils.getDefaultErrorCode(),
              },
            ],
          })
      }
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
