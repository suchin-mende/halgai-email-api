function redirectPage() {
      window.location = redirectUrl      
}

function invokeWxPayment () {
      const pq = JSON.parse(payRequest)
      WeixinJSBridge.invoke(
            'getBrandWCPayRequest', pq,
            function(res){
                  console.log(res)
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  }
            }
      );
}
function wxRegistCallback() {
      console.log(typeof WeixinJSBridge === 'undefined')
      if (payRequest && payRequest.length > 0) {
            invokeWxPayment()
      } else {
            redirectPage()
      }
}
function registWeixinListener() {
      if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', wxRegistCallback, false);
            } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', wxRegistCallback);
                  document.attachEvent('onWeixinJSBridgeReady', wxRegistCallback);
            }
      } else {
            wxRegistCallback()
      }
}

$(function () {
      registWeixinListener()
});
