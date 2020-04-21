/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db } from '../../../../db/db';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class Owner
 */
export class Owner extends BaseRoute {
  /**
   * Constructor
   *
   * @class Owner
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class Owner
   * @method create
   * @static
   */
  public static create(router: Router) {
    // add deliareas route
    router.get('/v1/:id/owners', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }
      query.companyId = req.session.user.companyId;
      query.logicalWhId = req.session.user.logicalWhId;
      try {
        const db = await Db.getSubdb(req.session.db);
        const owners = await Db.owner.select(db, query);
        res.json({ owners: owners });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
