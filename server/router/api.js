/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Custom Imports  ----------*/
const UserModel = require('../schema/user');
const auth = require('../lib/auth');
const util = require('../lib/utility').getInstance();

/*----------  Setup  ----------*/
const ApiRouter = Router();

/*==================================
=            ApiRouter            =
==================================*/

ApiRouter.post('/user/signup', (req, res) => {

  // Get parameters
  const { username, email, password } = req.body;

  // Validate
  if (!username || !email || !password) return res.json({
    error: 'Missing parameters',
    success: false,
  });
  if (util.emailInvalid(email)) return res.json({
    error: 'Invalid email',
    success: false,
  });

  // Prep user info
  const hashObj = auth.hashPassword(password);
  const newUser = new UserModel({
    username,
    email,
    salt: hashObj.salt,
    password: hashObj.hashedPassword,
  });

  // Save the user
  newUser.save()
    .then((data) => {
      res.json({
        token: auth.createJWToken({
          sessionData: {
            username: data.username,
            email: data.email,
          },
        }),
        success: true,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const key = util.getMongoViolater(err);
        const value = (key === 'username') ? username : email;
        return res.json({
          error: `The ${key} '${value}' is already taken`,
          success: false,
        });
      }
      util.error(err.message);
      return res.status(500).end();
    });

}); // end post('/user/signup')

ApiRouter.post('/user/login', (req, res) => {

  // Get parameters
  const { email, password } = req.body;

  // Validate
  if (!email || !password) return res.json({
    error: 'Missing parameters',
    success: false,
  });
  if (util.emailInvalid(email)) return res.json({ 
    error: 'Invalid email',
    success: false,
  });

  // Find the user by email
  UserModel.find({ email }).exec()
    .then((data) => {
      if(data.length === 0) return res.json({
        error: 'No user with that email',
        success: false,
      });
      const user = data[0];
      if (auth.verifyPassword(password, user.salt, user.password)) {
        res.json({
          token: auth.createJWToken({
            sessionData: {
              username: user.username,
              email: user.email,
            },
          }),
          success: true,
        });
      } else {
        res.json({
          error: 'Invalid password',
          success: false,
        });
      }
    })
    .catch((err) => {
      util.error(err.message);
      return res.status(500).end();
    });

}); // end post('/user/login')

ApiRouter.get('/user/validate', auth.verifyJWT_MW, (req, res) => {

  const { username, email } = req.user;

  res.json({
    username,
    email,
    success: true,
    error: '',
  });

}); // end get('/user/validate')

/*=====  End of ApiRouter  ======*/

module.exports = ApiRouter;
