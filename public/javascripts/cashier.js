function redirectPage() {
      console.log(typeof WeixinJSBridge === 'undefined')
      window.location = redirectUrl
}
function registWeixinListener() {
      if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', redirectPage, false);
            } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', redirectPage);
                  document.attachEvent('onWeixinJSBridgeReady', redirectPage);
            }
      } else {
            redirectPage()
      }
}

$(function () {
      registWeixinListener()
});
