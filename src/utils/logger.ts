import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const moment = require('moment');
moment.locale('ja');
const loggerTimestampMoment = function(){
  return moment().format('YYYY/MM/DD HH:mm:ss');
}
// path to log directory
const logDirectory = path.join(__dirname, '../../log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logOpt = {
  filename: `${logDirectory}/applicationLog`,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  localTime: true,
  level: 'info'
};
const exceptionOpt = {
  filename: `${logDirectory}/exceptionLog`,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  localTime: true,
  level: 'info'
};

const Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: loggerTimestampMoment }),
    new (require('winston-daily-rotate-file'))(logOpt)
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: loggerTimestampMoment }),
    new (require('winston-daily-rotate-file'))(exceptionOpt)
  ],
  exitOnError: false
});

export { Logger };