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

const auth = new AuthenticationMiddleware();
const passport = require('passport');
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
    router.get('/v1/:id/users', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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

    router.get('/v1/:id/users/:uid', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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

    router.post('/v1/:id/user', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        serviceId: req.session.user.serviceId,
        userCd: req.body.userCd,
        password: req.body.password,
        telTx: req.body.telTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db2.mainDb.models.mUser.insert(query);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/v1/:id/user', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        serviceId: req.session.user.serviceId,

        langTx: req.body.langTx,
        password: req.body.password,
        mail: req.body.mail,
        countryCd: req.body.countryCd,
        tel: req.body.tel,
        myNo: req.body.myNo,
        sex: req.body.sex,
        wechatCd: req.body.wechatCd,

        userId: req.session.user.userId,
        userTx: req.body.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const result = await Db2.mainDb.models.mUser.update(query);
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
