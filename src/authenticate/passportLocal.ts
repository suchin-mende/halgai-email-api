/**
 * @fileoverview DB handler for the passport local strategy.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */
import { AuthenticationMiddleware } from './authenticationMiddleware';
// import { Db2 } from '../db/db';
import * as Passport from 'passport';

const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

export class PassportLocal {

  constructor(passport: Passport, db: any) {
    passport.serializeUser((user, cb) => {
      cb(null, user.username)
    });

    passport.deserializeUser((username, cb) => {
      username = JSON.parse(username);
      db.mainDb.models.mUser.authUser(username.userCd, username.companyCd, cb)
    });

    passport.use(new LocalStrategy({
      usernameField: 'userCd',
      passwordField: 'password'
    },
      (username, password, done) => {
        username = JSON.parse(username);
        db.mainDb.models.mUser.authUser(username.userCd, username.companyCd, (err, user) => {
          if (err) {
            return done(err)
          }

          // User not found
          if (!user) {
            return done(null, false)
          }

          // Always use hashed passwords and fixed time comparison
          bcrypt.compare(password, user.passwordTx, (err, isValid) => {
            if (err) {
              return done(err)
            }
            if (!isValid) {
              return done(null, false)
            }
            delete user.passwordTx;
            user.csrfTx = this.guid();
            return done(null, user)
          })
        })
      }
    ));

    passport.authenticationMiddleware = new AuthenticationMiddleware();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
