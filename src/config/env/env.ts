import * as path from 'path'

export const Settings = {
  path: path.normalize(path.join(__dirname, '..')),
  // redirectUrl: 'http://13.113.185.22:9000',
  redirectUrl: 'http://13.230.159.190:9000',
  secret: 'SECRET_GOES_HERE',
  redisStore: {
    url: '127.0.01',
    port: 6379,
    secret: 'REDIS-STORE-SECRET'
  },
  maindb: {
    protocol: 'mysql',
    query: { pool: true },
    host: '52.68.61.42:3306',
    database: 'malajahui_maindb',
    user: 'dbuser',
    password: 'Seaos2017!'
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
}
