/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Custom Imports  ----------*/
const UserModel = require('../schema/user');
const { 
  log,
  hash,
  verify,
  isValid,
  parseMongoError,
} = require('../utility');

/*----------  Setup  ----------*/
const ApiRouter = Router();

/*==================================
=            ApiRouter            =
==================================*/

ApiRouter.post('/user/signup', (req, res) => {

  // Validate the post PARAMS
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).send({
    message: 'Missing parameters in request.',
    requiredFields: ['username', 'email', 'password'],
  });

  // Validate the email
  if (!isValid.email(email)) {
    return res.status(422).send({ message: 'Bad Email' });
  }

  // Prep a new user
  const hashObj = hash(password);
  const newUser = new UserModel({
    username,
    email,
    salt: hashObj.salt,
    password: hashObj.hashedPassword,
  });

  // Save the new user in the database
  newUser.save()
    .then((data) => {
      req.auth.userId = data._id;
      res.send({
        username: data.username,
        email: data.email,
        message: 'OK',
      });
    })
    .catch((err) => {

      // parse the error message
      err = parseMongoError(err);

      // No duplicate keys allowed
      if (err.code === 11000) {
        const value = (err.key === 'username') ? username : email;
        return res.status(422).send({
          message: `The ${err.key} '${value}' is already taken`,
          identifier: err.key,
          value,
        });
      }

      // Log and close the response
      log.error(err.message);
      res.status(500).send({
        message: 'Server Error, Oops',
      });
    });

}); // end post('/user/signup')

ApiRouter.post('/user/login', (req, res) => {

  console.log(req.auth);

  // Validate the post params
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({
    message: 'Missing parameters in request.',
    requiredFields: ['email', 'password'],
  });

  // Validate email
  if (!isValid.email(email)) {
    return res.status(422).send({ message: 'Bad Email'});
  }

  // Find the user by email
  UserModel.find({ email }).exec()
    .then((data) => {

      if(data.length === 0) return res.send({
        message: 'Email is incorrect',
      });

      const user = data[0];
      const passed = verify(password, user.salt, user.password);

      if (passed) {
        res.send({
          message: 'OK',
          username: user.username,
        });
      } else {
        res.status(403).send({
          message: 'Bad Password',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });

}); // end post('/user/login')

/*=====  End of ApiRouter  ======*/

module.exports = ApiRouter;
