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
export class FamilyAquacul extends BaseRoute {
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
    // add aquaculs route
    router.get('/v1/:id/aquaculs', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const db = await Db.getSubdb(req.session.db);
        const aquacul = await Db.familyAquacul.select(db, query);
        const totaljson: any = await Db.familyAquacul.count(db, query);
        return res.json({ aquaculs: aquacul, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/v1/:id/aquaculs', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.logicalWhId,

        ownerId: req.body.ownerId,
        familyAquaculId: req.body.familyaquaculId,

        familyCd: req.body.familyCd,
        headuserId: req.body.headuserId,
        headuserTx: req.body.headuserTx,

        aquacul01Nr: req.body.aquacul01Nr,
        aquacul011Nr: req.body.aquacul011Nr,
        aquacul02Nr: req.body.aquacul02Nr,
        aquacul021Nr: req.body.aquacul021Nr,
        aquacul03Nr: req.body.aquacul03Nr,
        aquacul031Nr: req.body.aquacul031Nr,
        aquacul032Nr: req.body.aquacul032Nr,
        aquacul033Nr: req.body.aquacul033Nr,
        aquacul034Nr: req.body.aquacul034Nr,
        aquacul035Nr: req.body.aquacul035Nr,
        aquacul04Nr: req.body.aquacul04Nr,
        aquacul05Nr: req.body.aquacul05Nr,
        aquacul06Nr: req.body.aquacul06Nr,

        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db.getSubdb(req.session.db);
        const result = await Db.familyAquacul.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/aquaculs/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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
          result.push(await Db.familyAquacul.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

  }
}
