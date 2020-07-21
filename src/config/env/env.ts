import * as path from 'path'

export const Settings = {
         path: path.normalize(path.join(__dirname, '..')),
         redirectUrl: 'http://localhost',
         pdslApiDomain: 'http://pla.mongol.email',
         secret: 'SECRET_GOES_HERE',
         redisStore: {
           url: '127.0.01',
           port: 6379,
           secret: 'REDIS-STORE-SECRET',
         },
         maindb: {
           protocol: 'mysql',
           query: { pool: true },
           host: 'localhost',
           database: 'h_userdb',
           user: 'root',
           password: 'Halgai*0201',
         },
         string: {
           COOKIE_SESSION_KEY: 'sessionKey',
           DEFAULT_ERROR_CODE: 'E999999',
         },
       }
