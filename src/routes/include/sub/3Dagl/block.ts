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
 * @class Block
 */
export class Block extends BaseRoute {
  /**
   * Constructor
   *
   * @class Block
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class Block
   * @method create
   * @static
   */
  public static create(router: Router) {
    // add deliareas route
    router.get('/:lan/v1/:id/block', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }
      console.log(query);
      try {
        const db = await Db3.getSubdb(req.session.db);
        const blocks = await Db3.block.select(db, query);
        res.json({ blocks: blocks })
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 新增目录
    router.post('/:lan/v1/:id/block', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.blockCd)
        || Utils.isEmpty(params.blockTx)
        || Utils.isEmpty(params.templateFl)
        || Utils.isEmpty(params.type)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.block.insert(db, params);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 更新目录
    router.put('/:lan/v1/:id/block/:blockId', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let params = req.body;
      if (Utils.isEmpty(params.blockCd)
        || Utils.isEmpty(params.blockTx)
        || Utils.isEmpty(params.parentBlockId)
        || Utils.isEmpty(params.templateFl)
        || Utils.isEmpty(params.type)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.blockId = req.params.blockId;

      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.block.update(db, params);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.delete('/:lan/v1/:id/block/:bid', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const query = {
        blockId: req.params.bid
      };
      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.block.delete(db, query);
        return res.json({ message: 'OK' });
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
