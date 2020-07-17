import * as path from 'path';

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'http://localhost:8080',
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
  }
};
