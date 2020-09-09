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
    getMimeType(mimeType) {
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
