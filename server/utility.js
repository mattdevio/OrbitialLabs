/*----------  Vendor Imports  ----------*/
const winston = require('winston');
const path = require('path');
const crypto = require('crypto');

/**
 * Winston Logger - Can write errors to file
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ 
      level: 'error',
      filename: path.resolve(__dirname, '../logs/error.log'),
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

/**
 * Crypto stuff, its a secret
 */
function hash(password) {
  if (typeof password !== 'string') throw new Error('You can only hash a string');
  const output = {};
  output.salt = crypto.randomBytes(5).toString('hex');
  output.hashedPassword = password;
  for(let i=0; i<3; i++){
    output.hashedPassword = crypto.createHmac('sha256', output.salt).update(output.hashedPassword).digest('hex');
  }
  return output;
}

module.exports.hash = hash;

/**
 * More crypto, why not
 */
function verify(password, salt, hashedPassword) {
  if (!password || !salt || !hashedPassword) return false;
  for(let i=0; i<3; i++){
    password = crypto.createHmac('sha256', salt).update(password).digest('hex');
  }
  return (hashedPassword === password);
}

module.exports.verify = verify;
