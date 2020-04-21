import * as path from 'path';

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'http://localhost:9000',
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
    database: 'halgai_maindb',
    user: 'root',
    password: 'root'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  },
  s3Bucket: 'saas-wms-image-dev',
  amazonaws: {
    accessKeyId: 'AKIAJV4HZJZ4MKBPB5PA',
    secretAccessKey: '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',
    region: 'us-east-1'
  }
};
