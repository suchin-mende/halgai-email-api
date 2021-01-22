var crypto = require('crypto');
const axios = require('axios');
import { Settings } from '../config/settings';

function randomWord(randomFlag, min, max){
      var str = "",
      range = min,
      arr = [];
      for (let i = 48; i < 58; i++)
            arr.push(i)
      for (let i = 97; i < 123; i++)
            arr.push(i)
      if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
      }
      let pos = 0;
      for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += String.fromCharCode(arr[pos]);
      }
      return str;
}
    
function sign (params, key) {
      const sorted = [...Object.keys(params)].sort()
      let str = ''
      sorted.forEach(k => {
            if (str.length > 0)
                  str += '&';
            str += `${k}=${params[k]}`
      })
      str += `&key=${key}`;
      var md5 = crypto.createHash('md5');
      return md5.update(str).digest('hex');
}

function obj2Xml(params) {
      let xml = '<xml>';
      Object.keys(params).forEach(k => {
            if (k === 'body' || k === 'sign')
                  xml += `<${k}><![CDATA[${params[k]}]]></${k}>`;
            else
                  xml += `<${k}>${params[k]}</${k}>`;
      });
      xml += '</xml>';
      return xml;
}

// 微信统一下单
export async function unifiedOrder (
      appId, mchId, key, body, tradeNo, totalFee, userIp, notifyUrl,
      tradeType, openid) {
      const params = {
            appId: appId,
            mchId: mchId,
            nonce_str: randomWord(true, 32, 32),
            body: body,
            out_trade_no: tradeNo,
            total_fee: totalFee,
            spbill_create_ip: userIp,
            notify_url: notifyUrl,
            trade_type: tradeType
      };
      (openid != null) && (params['openid'] = openid)
      const signStr = sign(params, key)
      params['sign'] = signStr
      console.log(params)
      const xml = obj2Xml(params);
      console.log(xml);

      return new Promise((resolve, reject) => {
              axios
              .post(Settings.wx.unifiedUrl, xml, {
              })
              .then(res => {
                  resolve(res)
              })
              .catch((err) => {
                  reject(err)
              })
          })
}