import * as path from 'path';

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'http://localhost:8080',
  emailServerDomain: 'http://localhost:8888',
  pdslApiDomain: 'http://localhost',
  secret: 'SECRET_GOES_HERE',
  redisStore: {
    url: 'localhost',
    port: 6379,
    secret: 'REDIS-STORE-SECRET'
  },
  maindb: {
    protocol: 'mysql',
    query: { pool: true },
    host: '127.0.0.1',
    database: 'maindb_local',
    user: 'root',
    password: 'root'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  },
  vipPlan: {
    nomalQuota: 500,
    premiumQuota: 1000,
    firstQuota: 2000,
    capacityDefault: 1,
    capacityNormal: 2,
    capacityPremium: 3,
    capacityFirst: 4,
    attachmentDefault: 1,
    attachmentNormal: 2,
    attachmentPremium: 3,
    attachmentFirst: 4
  },
  uploadSetting : {
    path: path.resolve(__dirname,'../../../public/upload'),
    folderImage: 'images',
    folderDoc: 'documents',
    mimeTypes: [
      {'image/png': ['png']}, 
      {'image/jpeg': ['jpeg', 'jpg']}, 
      {'application/pdf': ['pdf']}
    ],
    getMimeType(mimeType) {
      for (let i = 0; i < this.mimeTypes.length; i++) {
        for (const p in this.mimeTypes[i])
          if (p === mimeType)
            return this.mimeTypes[i];
      }
      return null;
    },
    image: {
      maxWidth: 2000,
      maxHeight: 2000,
      thumbWidth: 320,
      quality: 100
    }
  },
  wx: {
    GET_ACCESS_TOKEN_URL: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code',
    APPID: 'wxdda31f6bdf2cc976',
    SECRET: '3a66cad52d927f0e3b0f89de3537f46f',
    unifiedUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    OAuth: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect',
    halgai: {
      mchId: '1602735026',
      key: 'V0H7Iq2YQCGHNtHgt35uyqtetUJNlMr7',
      mp: {
        // 公众号
        appId: 'wxfb957686704a1b4d',
        key: '9382dd5a40e93be55a0e2a4e415977e2'
      },
      mail: {
        appId: ''
      }
    }
  },
  cashierUrl: {
    default: 'https://api.mongol.email/%s/v1/%s/cashier/%s',
    payment: 'https://api.mongol.email/%s/v1/%s/cashier/pay/%s',
  },
  EMAIL_API_LOGIN_URL: 'http://mongol.email/?/ApiLogin/%s/%s'
};
