/**
 * @fileoverview Arrivals route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.2
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db1 } from '../../../../db/db';

const moment = require('moment');
const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class FamilyUsers
 */
export class FamilyUsers extends BaseRoute {
  /**
   * Constructor
   *
   * @class FamilyUsers
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class FamilyUsers
   * @method create
   * @static
   */
  public static create(router: Router) {
    // add familyusers route
    router.get('/v1/:id/familyusers', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const db = await Db1.getSubdb(req.session.db);
        const familyUsers = await Db1.familyUsers.select(db, query);
        const totaljson: any = await Db1.familyUsers.count(db, query);
        console.log("familyTotal===="); console.log(JSON.stringify(totaljson));
        return res.json({ familyusers: familyUsers, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/familyusers', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.logicalWhId,

        ownerId: req.body.ownerId,
        familyCd: req.body.familyCd,
        familyUserCd: req.body.userCd,
        familyUserTx: req.body.userTx,
        sexCd: req.body.sexCd,
        birthDt: req.body.birthDt,
        identification: req.body.identification,
        ownerFl: req.body.ownerFl,
        politicalBackfield: req.body.politicalBackfield,
        wenhua: req.body.wenhua,
        telTx: req.body.telTx,
        wechat: req.body.wechat,
        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = await Db1.familyUsers.insert(db, query);
        return res.json({ message: '登録完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/v1/:id/familyusers', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.logicalWhId,

        ownerId: req.body.ownerId,
        familyCd: req.body.familyCd,
        familyUserId: req.body.userId,
        familyUserTx: req.body.userTx,
        sexCd: req.body.sexCd,
        birthDt: req.body.birthDt,
        identification: req.body.identification,
        ownerFl: req.body.ownerFl,
        politicalBackfield: req.body.politicalBackfield,
        wenhua: req.body.wenhua,
        telTx: req.body.telTx,
        wechat: req.body.wechat,
        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = await Db1.familyUsers.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/familyusers/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      if (!req.body.selectItems) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = [];
        for (let plan of req.body.selectItems) {
          result.push(await Db1.familyUsers.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });


  }
}
