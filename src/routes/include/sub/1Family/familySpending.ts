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
export class FamilySpending extends BaseRoute {
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
    // add spendings route
    router.get('/:lan/v1/:id/spendings', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const db = await Db1.getSubdb(req.session.db);
        const spendings = await Db1.familySpending.select(db, query);
        const totaljson: any = await Db1.familySpending.count(db, query);
        return res.json({ spendings: spendings, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/:lan/v1/:id/spendings', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.serviceId,

        ownerId: req.body.ownerId,
        familySpendingId: req.body.familyspendingId,

        familyCd: req.body.familyCd,
        headuserId: req.body.headuserId,
        headuserTx: req.body.headuserTx,

        spending011Nr: req.body.spending011Nr,
        spending012Nr: req.body.spending012Nr,
        spending013Nr: req.body.spending013Nr,
        spending014Nr: req.body.spending014Nr,
        spending015Nr: req.body.spending015Nr,

        spending021Nr: req.body.spending021Nr,
        spending022Nr: req.body.spending022Nr,
        spending023Nr: req.body.spending023Nr,
        spending024Nr: req.body.spending024Nr,
        spending025Nr: req.body.spending025Nr,
        spending031Nr: req.body.spending031Nr,

        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = await Db1.familySpending.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/:lan/v1/:id/spendings/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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
          result.push(await Db1.familySpending.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

  }
}
