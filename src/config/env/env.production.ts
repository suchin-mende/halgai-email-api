import * as path from 'path'

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  redirectUrl: 'http://18.182.16.49:9000',
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
    database: 'malajahui_maindb',
    user: 'dbuser',
    password: 'Seaos2017!'
  },
  string: {
    COOKIE_SESSION_KEY: 'sessionKey',
    DEFAULT_ERROR_CODE: 'E999999'
  },
  s3Bucket: 'saas-wms-image-pro',
  amazonaws: {
    accessKeyId: 'AKIAJV4HZJZ4MKBPB5PA',
    secretAccessKey: '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',
    region: 'us-east-1'
  }
}
