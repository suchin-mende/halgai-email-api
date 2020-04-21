import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as Rstore from 'connect-redis';
import * as morgan from 'morgan';
import * as winston from 'winston';
import * as path from 'path';
import * as cors from 'cors';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';

import { IndexRoute } from './routes/index';
import { Db } from './db/db';
import { Settings } from './config/settings';
import { PassportLocal } from './authenticate/passportLocal';

const session = require('./utils/session/index');
const RedisStore = Rstore(session);
const signature = require('cookie-signature');
const cookie = require('cookie');
const fileUpload = require('express-fileupload');

// path to log directory
const logDirectory = path.join(__dirname, '../log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream for normal access
const accessLog = rfs('access.log', {
  size: '10M',  // rotate every 10 MegaBytes written
  interval: '1d',   // rotate daily
  // compress: 'gzip', // compress rotated files
  path: logDirectory
});
// create a rotating write stream for error access
const accessLogError = rfs('accessError.log', {
  size: '10M',  // rotate every 10 MegaBytes written
  interval: '1d',   // rotate daily
  // compress: 'gzip', // compress rotated files
  path: logDirectory
});

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;
  public db = new Db();
  private passportLocal = new PassportLocal(passport);

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    this.app.use((req, res, next) => {
      res.header('x-api-type', 'wms');
      next();
    });
    this.app.use(cors({ exposedHeaders: 'x-api-type' }));
    this.app.use(fileUpload());

    //add static paths
    this.app.use(express.static(path.join(__dirname, '/../public')));

    //configure pug
    this.app.set('views', path.join(__dirname, '/../views'));
    this.app.set('view engine', 'pug');

    //mount morgan logger
    this.app.use(morgan('dev')); // Development output
    this.app.use(morgan('combined', { // Normal HTTP access logs
      skip: function (req, res) {
        return res.statusCode >= 400
      },
      stream: accessLog
    }));
    this.app.use(morgan('combined', { // HTTP error logs
      skip: function (req, res) {
        return res.statusCode < 400
      },
      stream: accessLogError
    }));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount cookie parser middleware
    this.app.use(cookieParser(Settings.secret));

    // mount the redis session
    this.app.use(session({
      store: new RedisStore({
        url: `redis://${Settings.redisStore.url}`
      }),
      secret: Settings.secret,
      resave: false,
      saveUninitialized: false,
      xSessionName: 'x-session-key'
    }))
    this.app.use(passport.initialize());
    this.app.use(passport.session())

  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);

    // catch 404 and forward to error handler
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const url = Settings.redirectUrl + req.url;
      res.redirect(307, url);
    });

    //error handling
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }

}
