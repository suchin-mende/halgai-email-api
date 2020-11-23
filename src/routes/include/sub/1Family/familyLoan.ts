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
export class FamilyLoan extends BaseRoute {
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
    // add loans route
    router.get('/:lan/v1/:id/loans', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      try {
        const db = await Db1.getSubdb(req.session.db);
        const loans = await Db1.familyLoan.select(db, query);
        const totaljson: any = await Db1.familyLoan.count(db, query);
        return res.json({ loans: loans, total: totaljson.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.put('/:lan/v1/:id/loans', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ errors: [ErrorUtils.getErrorJson(req.session.user.langTx, 'error_http_body_required_jsondata')] });
      }
      const query = {
        companyId: req.session.user.companyId,
        logicalWhId: req.session.user.serviceId,

        ownerId: req.body.ownerId,
        familyLoanId: req.body.familyloanId,

        familyCd: req.body.familyCd,
        headuserId: req.body.headuserId,
        headuserTx: req.body.headuserTx,

        loan0111Tx: req.body.loan0111Tx,
        loan0112Nr: req.body.loan0112Nr,
        loan0113Dt: req.body.loan0113Dt,
        loan0121Tx: req.body.loan0121Tx,
        loan0122Nr: req.body.loan0122Nr,
        loan0123Dt: req.body.loan0123Dt,
        loan0131Tx: req.body.loan0131Tx,
        loan0132Nr: req.body.loan0132Nr,
        loan0133Dt: req.body.loan0133Dt,

        loan0211Nr: req.body.loan0211Nr,
        loan0212Dt: req.body.loan0212Dt,
        loan0221Nr: req.body.loan0221Nr,
        loan0222Dt: req.body.loan0222Dt,
        loan0231Nr: req.body.loan0231Nr,
        loan0232Dt: req.body.loan0232Dt,

        noteTx: req.body.noteTx,

        userId: req.session.user.userId,
        userTx: req.session.user.userTx,
        updprogramCd: req.body.updprogramCd
      };
      try {
        const db = await Db1.getSubdb(req.session.db);
        const result = await Db1.familyLoan.update(db, query);
        return res.json({ message: '修正完璧' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.post('/:lan/v1/:id/loans/delete', auth.auth, async (req: any, res: Response, next: NextFunction) => {
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
          result.push(await Db1.familyLoan.del(db, plan.userId));
        }
        return res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

  }
}
