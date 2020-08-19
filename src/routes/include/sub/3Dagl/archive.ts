/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db3 } from '../../../../db/db';
import { Utils } from '../../../../utils/utils';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class Project
 */
export class Archive extends BaseRoute {
  /**
   * Constructor
   *
   * @class Project
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class Project
   * @method create
   * @static
   */
  public static create(router: Router) {

    // 检索档案
    router.get('/:lan/v1/:id/archive', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }

      if (query.projectId == null || query.blockId == null) 
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });

      try {
        Utils.args2SqlLimit(query);

        const db = await Db3.getSubdb(req.session.db);
        const count = await Db3.archive.selectCount(db, query);
        let result = {};
        if (count > 0)
          result['archives'] = await Db3.archive.select(db, query);

        Utils.pagerNext(req, query, count, result['archives'], result);
        res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 新增档案
    router.post('/:lan/v1/:id/archive', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.projectId) 
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.archiveCd) 
          || Utils.isEmpty(params.archiveTx)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.archive.insert(db, params);
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 更新档案
    router.put('/:lan/v1/:id/archive/:archiveId', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.projectId) 
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.archiveCd) 
          || Utils.isEmpty(params.archiveTx)
          || params.stateFl == null) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.archiveId = req.params.archiveId;
      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.archive.update(db, params);
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
