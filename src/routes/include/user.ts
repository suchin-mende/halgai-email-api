/**
 * @fileoverview User route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../route';
import { ErrorUtils } from '../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../authenticate/authenticationMiddleware';
import { Db } from '../../db/db';

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
        const users = await Db.mainDb.models.maUser.getUsers(query);
        const total = await Db.mainDb.models.maUser.count(query);
        return res.json({ users: users, total: total.total });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.get('/v1/:id/users/:uid', (req: any, res: Response, next: NextFunction) => {

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
