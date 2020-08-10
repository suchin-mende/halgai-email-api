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
export class FamilyGrass extends BaseRoute {
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
    // add grass route
    router.get('/v1/:id/grass', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      query.ownerId = +req.query.ownerId;
      try {
        const db = await Db1.getSubdb(req.session.db);
        const grass = await Db1.familyGrass.select(db, query);
        const totaljson: any = await Db1.familyGrass.count(db, query);
        return res.json({ grass: grass, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/v1/:id/grass', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.logicalWhId,

        ownerId: req.body.ownerId,
        familyGrassId: req.body.familygrassId,
        familyCd: req.body.familyCd,
        headuserId: req.body.userId,
        headuserTx: req.body.userTx,
        grass01Nr: req.body.grass01Nr,
        grass011Nr: req.body.grass011Nr,
        grass012Nr: req.body.grass012Nr,
        grass013Nr: req.body.grass013Nr,
        grass014Nr: req.body.grass014Nr,
        grass015Nr: req.body.grass015Nr,
        grass016Nr: req.body.grass016Nr,
        grass02Nr: req.body.grass02Nr,
        grass03Nr: req.body.grass03Nr,
        grass031Nr: req.body.grass031Nr,
        grass032Nr: req.body.grass032Nr,
        grass033Nr: req.body.grass033Nr,
        grass034Nr: req.body.grass034Nr,
        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = await Db1.familyGrass.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/v1/:id/grass/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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
          result.push(await Db1.familyGrass.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

  }
}
