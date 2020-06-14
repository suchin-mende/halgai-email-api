/**
 * @fileoverview Arrivals route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.2
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db } from '../../../../db/db';
import { Utils } from '../../../../utils/utils';

import * as xlsx from 'xlsx';

const moment = require('moment');
const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class FamilyUsers
 */
export class FamilyBasics extends BaseRoute {
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
    // add familybasics route
    router.get('/v1/:id/familybasics', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const db = await Db.getSubdb(req.session.db);
        const familyBasics = await Db.familyBasics.select(db, query);
        const totaljson: any = await Db.familyBasics.count(db, query);
        return res.json({ familybasics: familyBasics, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/v1/:id/familybasics', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.logicalWhId,

        ownerId: req.body.ownerId,
        familybasicId: req.body.familybasicId,

        familyCd: req.body.familyCd,
        headuserId: req.body.headuserId,
        headuserTx: req.body.headuserTx,
        familypeopleNr: req.body.familypeopleNr,
        labour: req.body.labour,

        muyerenyuan: req.body.muyerenyuan,
        sumu: req.body.sumu,
        gacha: req.body.gacha,
        pinkunFl: req.body.pinkunFl,
        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db.getSubdb(req.session.db);
        const result = await Db.familyBasics.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/familybasics/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      if (!req.body.selectItems) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      try {
        const db = await Db.getSubdb(req.session.db);
        const result = [];
        for (let plan of req.body.selectItems) {
          result.push(await Db.familyBasics.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

  }
}
