/*----------  Vendor Imports  ----------*/
const winston = require('winston');
const path = require('path');

/*----------  Setup  ----------*/
const UTILITY_KEY = Symbol('utility');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ 
      level: 'error',
      filename: path.resolve(__dirname, '../../logs/error.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

/*===============================================
=            Utility Singleton Class            =
===============================================*/

class Utility {

  constructor(symbol) {
    if (symbol !== UTILITY_KEY) {
      throw new Error('Utility is a singleton, use .getInstance() to reference it.');
    }
  }

  static getInstance() {
    if (!Utility[UTILITY_KEY]) {
      Utility[UTILITY_KEY] = new Utility(UTILITY_KEY);
    }
    return Utility[UTILITY_KEY];
  }

  log(...args) {
    logger.info(...args);
  }

  error(...error) {
    logger.error(...error);
  }

  emailInvalid(email) {
    return (email.indexOf('@') < 2);
  }

  getMongoViolater(error) {
    // eslint-disable-next-line no-useless-escape
    const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;
    return error.message.match(regex)[1];
  }

}

module.exports = Utility;

/*=====  End of Utility Singleton Class  ======*/
