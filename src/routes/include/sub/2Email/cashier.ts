/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { Db } from '../../../../db/db';
import { unifiedOrder } from '../../../../utils/wx'
import { Settings } from '../../../../config/settings';

/**
 * / route
 *
 * @class Project
 */
export class Cashier extends BaseRoute {

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

    /**
     * 微信授权
     */
    router.get('/:lan/v1/:id/cashier/:orderId', (req: Request, res: Response, next: NextFunction) => {
      new Cashier().cashierView(req, res, next);
    });

    router.get('/:lan/v1/:id/cashier/pay/:orderId', (req: Request, res: Response, next: NextFunction) => {
      const { lan, id, orderId } = req.params
      console.log(req)
      console.log(req.query.code)
      new Cashier().cashierView(req, res, next);
    });
  }

  public cashierView(req: Request, res: Response, next: NextFunction) {
    this.title = '支付';

    const { lan, id, orderId } = req.params
    let redirectParams = [ lan, id, orderId ]
    let idx = 0
    const redirectUrl = Settings.cashierUrl.payment.replace(/%s/g, () => redirectParams[idx++])
    redirectParams = [ Settings.wx.default.appId.mp, encodeURIComponent(redirectUrl)]
    idx = 0
    const oauthUrl = Settings.wx.OAuth.replace(/%s/g, () => redirectParams[idx++])
    res.render('cashier', {
      redirectUrl: oauthUrl
    });
  }

}
