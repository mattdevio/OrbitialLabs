/*----------  Vendor Imports  ----------*/
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/*----------  Custom Imports  ----------*/
const util = require('./utility').getInstance();

/*----------  Setup  ----------*/
const JWT_SECRET = 'fjdk2l389ufz2';

/**
 * verifyJWToken - Verifies the JWT
 * @param  {string}  token [The JSON web token to verify]
 * @return {Promise}       [A promise with the decoded token]
 */
function verifyJWToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

/**
 * createJWToken - Creates a JWT
 * @param  {object} details [A token configuration object]
 * @return {object}         [A signed token]
 */
function createJWToken(details) {
  if (typeof details !== 'object') {
    details = {};
  }
  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600;
  }
  details.sessionData = details.sessionData || {};
  details.sessionData = Object.keys(details.sessionData).reduce((acc, key) => {
    const value = details.sessionData[key];
    if (typeof value === 'function' || key !== 'password') {
      acc[key] = value;
    }
    return acc;
  }, {});
  const token = jwt.sign({
    data: details.sessionData,
  }, JWT_SECRET, {
    expiresIn: details.maxAge,
    algorithm: 'HS256',
  });
  return token;
}

/**
 * verifyJWT_MW - An express style middleware that verifies a JWT
 * @param  {object}   req  [An express request object]
 * @param  {object}   res  [An express response object]
 * @param  {Function} next [Callback that runs the next function in the express call stack]
 */
function verifyJWT_MW(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ error: 'No authorization header set.'});
  }
  const token = req.headers.authorization;
  verifyJWToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.data;
      next();
    })
    .catch((err) => {
      util.error(err);
      res.status(403).json({
        error: 'Unauthorized',
      });
    });
}

/**
 * hashPassword - Returns an object with a random 'salt' and 'hashedPassword'
 * @param  {string} password [A users password to hash]
 * @return {object}          [An object with a random 'salt' and it's matching 'hash']
 */
function hashPassword(password) {
  if (typeof password !== 'string') throw new Error('You can only hash a string');
  const output = {};
  output.salt = crypto.randomBytes(5).toString('hex');
  output.hashedPassword = password;
  for(let i=0; i<3; i++){
    output.hashedPassword = crypto.createHmac('sha256', output.salt).update(output.hashedPassword).digest('hex');
  }
  return output;
}

/**
 * verifyPassword - Returns true if the 'salt' and hashed 'password' matches the 'hash'.
 * @param  {string} password [The password to test]
 * @param  {string} salt     [The salt that was used to create to the 'hash']
 * @param  {string} hash     [The hashed password]
 * @return {boolean}         [True if the 'salt' and hashed 'password' matches the 'hash']
 */
function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) return false;
  for(let i=0; i<3; i++){
    password = crypto.createHmac('sha256', salt).update(password).digest('hex');
  }
  return (hash === password);
}

// Export All Functions
module.exports = {
  verifyJWToken,
  createJWToken,
  verifyJWT_MW,
  hashPassword,
  verifyPassword,
};
