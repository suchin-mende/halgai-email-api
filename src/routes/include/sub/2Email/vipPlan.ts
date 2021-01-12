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
var QRCode = require('qrcode')

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

  public static async calVipPrice(lang, serviceId, userCd, ticketCode, plan) {
    const { models } = Db.mainDb
    try {
      const params = {
        lang: lang,
        serviceId: serviceId,
        couponCd: ticketCode
      }

      const result = {
        realMoney: plan.price, // 实付款
        price: plan.price // 原价
      }

      if (ticketCode == null) {
        return result;
      }

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
          result['couponId'] = t.couponId;
          break;
        case 1:
          result.realMoney = plan.price - t.price;
          result['discountPrice'] = t.print;
          result['couponId'] = t.couponId;
          break;
        case 3:
          if (userCd.length !== 3)
            break;
          
          const addAmount = t.price * (100 - t.discountRate)/100;
          result['addAmount'] = addAmount;
          if (t.price !== addAmount)
            result['addPrice'] = t.price;
          result.realMoney += addAmount;
          result['couponId'] = t.couponId;
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
    router.get('/:lan/v1/:id/vip/coupon/:userId/:pid/:code?', async (req: any, res: Response, next: NextFunction) => {
      const { lan, userId, pid, code } = req.params
      const { models } = Db.mainDb
      let plan = null;
      let user = null;
      try {
        const params = {
          lang: lan,
          serviceId: req.headers.h_service_id,
          vipPlanCd: pid,
          status: 0
        }
  
        // vip付款计划
        const plans = await models.vipPlan.planList(params);
        if (plans.length == 0) {
          return res.status(400).send({ errors: [{ message: 'NotFound', code: ErrorUtils.getDefaultErrorCode() }] });
        }
        plan = plans[0]

        const users = await models.mUser.getUsers({
          userId: userId
        })
        if (users.length === 0) {
          return res.status(400).send({ errors: [{ message: 'NotFound', code: ErrorUtils.getDefaultErrorCode() }] });
        }
        user = users[0]
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }

      const result = await this.calVipPrice(lan, req.headers.h_service_id, user.userCd, code, plan)
      console.log(result)
      if (result == null) {
        return res.status(400).send({ errors: [{ message: 'SYSERR', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      // 生成记录
      const payment = await models.mUserPaymentLog.insertPaymentLog({
        userId: user.userId,
        serviceId: req.headers.h_service_id,
        lang: lan,
        payFl: 0,
        vipPlanCd: pid,
        monthNr: plan.monthNr,
        price: result.realMoney,
        paymentType: 'oth',
        couponId: result['couponId'],
        addUser: 0,
        addUserTx: 'xx'
      });
      if (payment['affectedRows'] == 0) {
        return res.status(400).send({ errors: [{ message: 'SYSERR', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      if (result['couponId'])
        delete result['couponId']

      const cashierParams = [ lan, req.params.id, payment['insertId'] ]
      let idx = 0
      result['qrdata'] = await QRCode.toDataURL(Settings.cashierUrl.default.replace(/%s/g, () => cashierParams[idx++]))
      res.json(result);
      // 生成订单
      // const { mail } = Settings.wx;
      // const unifiedResult = await unifiedOrder(mail.appId.native, mail.mchId, mail.key, plan.vipPlanTx, '1', 
      //   result.realMoney * 100, req.ip, '', 'JSAPI', 'productId')
      // res.json(result);
    });

  }

}
