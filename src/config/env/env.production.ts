import * as path from 'path'

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'https://api.mongol.email',
  emailServerDomain: 'https://mongol.email',
  pdslApiDomain: 'http://pla.mongol.email',
  secret: 'SECRET_GOES_HERE',
  redisStore: {
    url: 'localhost',
    port: 6379,
    secret: 'REDIS-STORE-SECRET'
  },
  maindb: {
    protocol: 'mysql',
    query: { pool: true },
    host: 'localhost',
    database: 'maindb',
    user: 'root',
    password: 'Halgai*0201'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  },
  vipPlan: {
    nomalQuota: 500,
    premiumQuota: 1000,
    firstQuota: 2000
  }
};
