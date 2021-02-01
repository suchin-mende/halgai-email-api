/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { Db } from '../../../../db/db';
import { unifiedOrder, checkSign, randomWord, sign as wxSign } from '../../../../utils/wx'
import { Settings } from '../../../../config/settings';
import { Utils } from '../../../../utils/utils'
import { lang } from 'moment';
import { log } from 'console';
import { sign } from 'crypto';
const axios = require('axios');
const util = require('util');
const Xml2js = require('xml2js');
const XmlParser = new Xml2js.Parser({explicitArray: false, ignoreAttrs: false});
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

    /**
     * 微信授权成功，重定向到当前路由
     */
    router.get('/:lan/v1/:id/cashier/pay/:orderId', async (req: Request, res: Response, next: NextFunction) => {
      new Cashier().cashierPaymentView(req, res, next);
    });
  }

  public cashierView(req: Request, res: Response, next: NextFunction) {
    this.title = '支付';

    const { lan, id, orderId } = req.params
    let redirectParams = [ lan, id, orderId ]
    let idx = 0
    const redirectUrl = Settings.cashierUrl.payment.replace(/%s/g, () => redirectParams[idx++])
    redirectParams = [ Settings.wx.halgai.mp.appId, encodeURIComponent(redirectUrl)]
    idx = 0
    const oauthUrl = Settings.wx.OAuth.replace(/%s/g, () => redirectParams[idx++])
    res.render('cashier', {
      redirectUrl: oauthUrl
    });
  }

  public async cashierPaymentView(req: Request, res: Response, next: NextFunction) {
    const { lan, id, orderId } = req.params
    const { code } = req.query
    console.log(`-----WXCODE:${code}`)
    if (!code) {
      res.render('cashier', {
        success: false
      });
      return
    }
    const pageModel = {
      success: false
    }
    const { models } = Db.mainDb
    // 查询订单
    const payment = await models.mUserPaymentLog.selectPayment({
      logId: orderId
    });

    pageModel.success = payment != null && payment.length > 0
    // code换取openid
    if (pageModel.success) {
      const { halgai } = Settings.wx
      const unifiedResult = this.payementInfo(code, payment[0], req)
      const payRequest = {
        appId: halgai.mp.appId,
        timeStamp: new Date().getTime() / 1000,
        nonceStr: randomWord(true, 32, 32),
        package: `prepay_id=${unifiedResult['prepay_id']}`,
        signType: 'MD5'
      }
      payRequest['paySign'] = wxSign(payRequest, Settings.wx.halgai.key)
      pageModel['payRequest'] = payRequest
    }
    res.render('cashier', pageModel);
  }

  private async payementInfo(code, paymentLog, req) {
    console.log('----- payment info')
    // 读取微信用户信息
    const wxResult = await axios
      .get(util.format(Settings.wx.GET_ACCESS_TOKEN_URL, 
        Settings.wx.halgai.mp.appId, Settings.wx.halgai.mp.key, code)
      );
    console.log(wxResult.data);
    const data = wxResult.data;
    if (!Utils.isEmpty(data.errcode)) {
      return null;
    }
    // const data = {
    //   openid: 'oa1qG5naiTSVWRYlhMBM17bw7RFs'
    // }

    // 查询vip plan
    const params = {
      vipPlanCd: paymentLog.vipPlanCd,
      status: 0,
      lang: req.params.lan,
      serviceId: req.headers.h_service_id
    }

    const plans = await Db.mainDb.models.vipPlan.planList(params);
    if (plans == null || plans.length == 0) {
      return null;
    }
    const plan = plans[0];

    // 提交订单
    const { halgai } = Settings.wx;
    const unifiedResult = await unifiedOrder(
        halgai.mp.appId,
        halgai.mchId,
        halgai.key,
        plan.vipPlanTx,
        paymentLog.paymentLogId, 
        paymentLog.price * 100,
        req.ip, Settings.cashierUrl.default, 'JSAPI', data.openid)

    try {
      const unified = await this.parseUnifiedResult(unifiedResult['data'])
      return unified
    } catch (err){
      return null
    }
  }

  private parseUnifiedResult(data) {
    return new Promise((resolve, reject) => {
      XmlParser.parseString(data, (err, result) => {
        const { xml } = result
        if (err) {
          reject(err)
          return
        }
        const isSign = checkSign(xml, Settings.wx.halgai.key)
        if (!isSign) {
          reject(new Error(''))
          return
        }

        if (xml['return_code'] === 'SUCCESS' && xml['result_code'] === 'SUCCESS') {
          resolve(xml)
          return
        }
        reject(new Error(''))
      })
    })
  }
}
