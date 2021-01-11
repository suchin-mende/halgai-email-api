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

  public static async calVipPrice(lang, serviceId, userCd, planCd, ticketCode) {
    const { models } = Db.mainDb
    try {
      const params = {
        lang: lang,
        serviceId: serviceId,
        vipPlanCd: planCd,
        status: 0
      }

      // vip付款计划
      const plans = await models.vipPlan.planList(params);
      const plan = plans[0]

      const result = {
        realMoney: plan.price, // 实付款
        price: plan.price // 原价
      }

      if (ticketCode == null) {
        return result;
      }

      delete params.vipPlanCd
      delete params.status
      params['couponCd'] = ticketCode

      //优惠券
      const tickets = await models.coupon.select(params)
      if (tickets == null || tickets.length == 0) {
        result['ticket'] = {
          status: 400,
          message: 'ERROR_NOT_COUPON'
        }
        return result;
      }

      const t = tickets[0]
      const now = new Date()
      if (t.fromDt > now || t.toDt < now) {
        result['ticket'] = {
          status: 400,
          message: 'ERROR_COUPON_OVERDUE'
        }
        return result;
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
      return result
    } catch (err) {
      console.log(err)
      return null;
    }
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
    router.get('/:lan/v1/:id/vip/plan/:pid/:child?', async (req: any, res: Response, next: NextFunction) => {
      const { pid, child } = req.params
      const params = {
        vipPlanCd: pid,
        status: 0,
        lang: req.params.lan,
        serviceId: req.headers.h_service_id
      }
      try {
        const plan = await Db.mainDb.models.vipPlan.planList(params);
        if (plan.length === 0) {
          return res.status(404).send({ errors: [{ message: 'NotFound', code: ErrorUtils.getDefaultErrorCode() }] });
        }

        const result = { ...plan[0] }
        if (!(child != null && eval(req.params.child) === true)) {
          res.json(result)
          return
        }
        delete params.vipPlanCd
        params['parentPlanCd'] = pid

        const plans = await Db.mainDb.models.vipPlan.planList(params);
        result['children'] = plans
        res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 选择服务时长或输入优惠券
    router.get('/:lan/v1/:id/vip/coupon/:userCd/:pid/:code?', async (req: any, res: Response, next: NextFunction) => {
      const { lan, userCd, pid, code } = req.params
      const result = await this.calVipPrice(lan, req.headers.h_service_id, userCd, pid, code)
      console.log(result)
      if (result == null) {
        return res.status(400).send({ errors: [{ message: 'SYSERR', code: ErrorUtils.getDefaultErrorCode() }] });
      }
      res.json(result);
    });
    
    // 提交订单
    router.get('/:lan/v1/:id/vip/pay/:userCd/:pid/:code?', async (req: any, res: Response, next: NextFunction) => {
      const { lan, userCd, pid, code } = req.params
      const priceResult = await this.calVipPrice(lan, req.headers.h_service_id, userCd, pid, code)

      const { mail } = Settings.wx;
      const result = await unifiedOrder(mail.appId.native, mail.mchId, mail.key, 'x会员 - x个月', '1', 
        priceResult.realMoney * 100, req.ip, '', 'NATIVE', 'productId')
      console.log(result)
    });
  }

}
