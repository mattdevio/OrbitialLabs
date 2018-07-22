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

/**
 * Validate a user's email
 * @param  {string}  email [The email]
 * @return {boolean}       [True if the email is in correct format]
 */
function validateEmail(email) {
  return (email.indexOf('@') > 0);
}

module.exports.isValid = {
  email: validateEmail,
};

/**
 * Get the bad key value pair from the mongo error
 * @param  {object} error       [The mongo db error]
 * @return {object}             [The kvp object]
 */
function parseMongoError(error) {
  // eslint-disable-next-line no-useless-escape
  const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;
  if (error.code === 11000) {
    error = {
      ...error,
      key: error.message.match(regex)[1],
    };
  }
  return error;
}
module.exports.parseMongoError = parseMongoError;

