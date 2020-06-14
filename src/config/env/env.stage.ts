import * as path from 'path';

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'https://stg-api.mongol.email',
  secret: 'SECRET_GOES_HERE',
  redisStore: {
    url: 'ec2-13-112-200-91.ap-northeast-1.compute.amazonaws.com',
    port: 6379,
    secret: 'REDIS-STORE-SECRET'
  },
  maindb: {
    protocol: 'mysql',
    query: { pool: true },
    host: 'localhost',
    database: 'maindb_stg',
    user: 'root',
    password: 'Aijinn2476!'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  }
};
