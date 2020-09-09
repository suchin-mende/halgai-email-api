import * as path from 'path';

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'https://stg-api.mongol.email',
  emailServerDomain: 'http://stg.mongol.email',
  pdslApiDomain: 'http://stg-pla.mongol.email',
  secret: 'SECRET_GOES_HERE',
  redisStore: {
    url: '127.0.0.1',
    port: 6379,
    secret: 'REDIS-STORE-SECRET'
  },
  maindb: {
    protocol: 'mysql',
    query: { pool: true },
    host: 'localhost',
    database: 'maindb_stg',
    user: 'root',
    password: 'pass'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  },
  vipPlan: {
    nomalQuota: 500,
    premiumQuota: 1000,
    firstQuota: 2000
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
    hasMimeType(mimeType) {
      for (let i = 0; i < this.mimeTypes.length; i++) {
        for (const p in this.mimeTypes[i])
          if (p === mimeType)
            return this.mimeTypes[i];
      }
      return null;
    },
    image: {
      maxWidth: 800,
      maxHeight: 800,
      thumbWidth: 320,
      quality: 85
    }
  }
};
