/**
 * @fileoverview Authentication middleware.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Response } from 'express';
import { ErrorUtils } from '../utils/errorUtils';
import { Db } from '../db/db';

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
const isAuthenticated = (req: any): boolean => {
  if (!req.session) {
    return false;
  }
  let property = 'user';
  if (req._passport && req._passport.instance) {
    property = req._passport.instance._userProperty || 'user';
  }
  return (req.session[property]) ? true : false;
}

/**
 * Test if request's company id is correct.
 *
 * @return {Boolean}
 * @api public
 */
const isCorrectCompany = (req: any): boolean => {
  return (req.session.user.companyCd === req.params.id) ? true : false;
}

export class AuthenticationMiddleware {

  constructor() { }

  auth (req: any, res: Response, next: NextFunction) {
    let lang = req.session.user ? req.session.user.langTx : 'cn';
    if (!isAuthenticated(req)) {
      return res.status(401).send({ errors: [ErrorUtils.getErrorJson(lang, 'http_unauthorized')] });
    }

    if (!isCorrectCompany(req)) {
      return res.status(401).send({ errors: [ErrorUtils.getErrorJson(lang, 'error_invalid_companycd')] });
    }

    Db.mainDb.models.mConnectionInfo.select({ connectionCd: req.session.user.connectionCd })
      .then(data => {
        if (data.length > 0) {
          req.session.db = data[0];
        }
        return next();
      })
      .catch(err => {
        return res.status(401).send({ errors: [ErrorUtils.getErrorJson(lang, 'http_unauthorized')] });
      });
  }

}
