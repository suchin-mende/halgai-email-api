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
export class Project extends BaseRoute {
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
    // add deliareas route
    router.get('/:lan/v1/:id/project', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }
      try {
        const db = await Db3.getSubdb(req.session.db);
        const projects = await Db3.project.select(db, query);
        res.json({ projects: projects })
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 新增工程
    router.post('/:lan/v1/:id/project', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.projectCd)
        || Utils.isEmpty(params.projectTx)
        || Utils.isEmpty(params.startDt)
        || Utils.isEmpty(params.endDt)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.project.insert(db, params);
        return res.json({ code: 0, mess: 'OK' });
      } catch (err) {
        return res.status(400).send({ code: 1, mess: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 更新目录
    router.put('/:lan/v1/:id/project/:projectId', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.projectCd)
        || Utils.isEmpty(params.projectTx)
        || Utils.isEmpty(params.startDt)
        || Utils.isEmpty(params.endDt)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.projectId = req.params.projectId;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.project.update(db, params);
        return res.json({ code: 0, mess: 'OK' });
      } catch (err) {
        return res.status(400).send({ code: 1, mess: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.delete('/:lan/v1/:id/project/:pid', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const query = {
        projectId: req.params.pid
      };
      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.project.delete(db, query);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
