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
      const { pid } = req.params
      const params = {
        vipPlanCd: pid,
        status: 0,
        lang: req.params.lan,
        serviceId: req.headers.h_service_id
      }
      try {
        const plan = await Db.mainDb.models.vipPlan.planList(params);
        if (plan.length === 0) {
          res.json({})
          return
        }

        const result = { ...plan[0] }
        delete params.vipPlanCd
        params['parentPlanCd'] = pid

        const plans = await Db.mainDb.models.vipPlan.planList(params);
        result['children'] = plans
        res.json(result);
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 选择服务时长或输入优惠券
    router.get('/:lan/v1/:id/vip/coupon/:userCd/:pid/:code?', async (req: any, res: Response, next: NextFunction) => {
      const { lan, userCd, pid, code } = req.params

      const { models } = Db.mainDb
      try {
        const params = {
          lang: lan,
          serviceId: req.headers.h_service_id,
          vipPlanCd: pid,
          status: 0
        }

        // vip付款计划
        const plans = await models.vipPlan.planList(params);
        const plan = plans[0]

        const result = {
          realMoney: plan.price, // 实付款
          price: plan.price // 原价
        }

        if (code == null) {
          res.json(result);
          return
        }

        delete params.vipPlanCd
        delete params.status
        params['couponCd'] = code
        console.log(params)

        //优惠券
        const tickets = await models.coupon.select(params)
        if (tickets == null || tickets.length == 0) {
          result['ticket'] = {
            status: 400,
            message: 'ERROR_NOT_COUPON'
          }
          res.json(result);
          return
        }

        const t = tickets[0]
        const now = new Date()
        if (t.fromDt > now || t.toDt < now) {
          result['ticket'] = {
            status: 400,
            message: 'ERROR_COUPON_OVERDUE'
          }
          res.json(result);
          return
        }

        switch (t.type) {
          case 0:
            result.realMoney = plan.price * (100 - t.discountRate)/100;
            result['discountRate'] = t.discountRate;
            break;
          case 1:
            result.realMoney = plan.price - t.price;
            result['discountPrice'] = t.print;
            break;
          case 3:
            if (userCd.length !== 3)
              break;
            
            const addAmount = t.price * (100 - t.discountRate)/100;
            result['addAmount'] = addAmount;
            if (t.price !== addAmount)
              result['addPrice'] = t.price;
            result.realMoney += addAmount;
            break;
        }

        res.json(result);
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });    
  }

}
