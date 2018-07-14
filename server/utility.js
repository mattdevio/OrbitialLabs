/*----------  Vendor Imports  ----------*/
const winston = require('winston');
const path = require('path');

/**
 * Winston Logger - Can write errors to file
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ 
      level: 'error',
      filename: path.resolve(__dirname, '../error.log'),
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

// Export Logger as `log`
module.exports.log = logger;
