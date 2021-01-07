/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { Db } from '../../../../db/db';

/**
 * / route
 *
 * @class Project
 */
export class VipPlan extends BaseRoute {
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
    // Vip方案
    router.get('/:lan/v1/:id/vip/plans', async (req: any, res: Response, next: NextFunction) => {
      const params = {
        parentPlanCd: 0,
        status: 0,
        lang: req.params.lan,
        serviceId: req.headers.h_service_id
      }
      try {
        const result = await Db.mainDb.models.vipPlan.planList(params);
        res.json(result);
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // Vip付款计划
    router.get('/:lan/v1/:id/vip/plan/:pid', async (req: any, res: Response, next: NextFunction) => {
      console.log(req.params.pid)
      const params = {
        parentPlanCd: req.params.pid,
        status: 0,
        lang: req.params.lan,
        serviceId: req.headers.h_service_id
      }
      try {
        const result = await Db.mainDb.models.vipPlan.planList(params);
        res.json(result);
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    router.get('/:lan/v1/:id/vip/coupon/:pid/:code', async (req: any, res: Response, next: NextFunction) => {
      const params = {
        couponCd: req.params.code,
        lang: req.params.lan,
        serviceId: req.headers.h_service_id
      }

      const { models } = Db.mainDb
      try {
        //优惠券
        const tickets = await models.coupon.select(params)
        if (tickets == null || tickets.length == 0) {
          return res.status(404).send({ errors: [{ message: 'NotFound', code: ErrorUtils.getDefaultErrorCode() }] });  
        }

        const t = tickets[0]
        const now = new Date()
        if (t.fromDt > now || t.toDt < now) {
          return res.status(404).send({ errors: [{ message: 'Expire', code: ErrorUtils.getDefaultErrorCode() }] });  
        }
        delete params.couponCd;
        params['parentPlanCd'] = req.params.pid,
        params['status'] = 0
        
        // vip付款计划
        const plans = await models.vipPlan.planList(params);

        // 计算金额
        res.json(plans);
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });    
  }

}
