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
export class News extends BaseRoute {
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

    // 检索公告
    router.get('/:lan/v1/:id/news', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }

      try {
        Utils.args2SqlLimit(query);

        const db = await Db3.getSubdb(req.session.db);
        const count = await Db3.news.selectCount(db, query);
        let result = {};
        if (count > 0)
          result['news'] = await Db3.news.select(db, query);

        Utils.pagerNext(req, query, count, result['news'], result);
        res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 新增公告
    router.post('/:lan/v1/:id/news', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      console.log(params);
      if (Utils.isEmpty(params.newsCd)
        || Utils.isEmpty(params.newsTx)
        || Utils.isEmpty(params.startDt)
        || Utils.isEmpty(params.endDt)
        || Utils.isEmpty(params.status)
        || Utils.isEmpty(params.contents)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.news.insert(db, params);
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 更新公告
    router.put('/:lan/v1/:id/news/:newsId', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.newsCd)
        || Utils.isEmpty(params.newsTx)
        || Utils.isEmpty(params.startDt)
        || Utils.isEmpty(params.endDt)
        || Utils.isEmpty(params.status)
        || Utils.isEmpty(params.contents)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.newsId = req.params.newsId;
      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.news.update(db, params);
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
