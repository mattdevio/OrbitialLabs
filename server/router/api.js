/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Custom Imports  ----------*/
const UserModel = require('../schema/user');
const { log, hash, verify } = require('../utility');

/*----------  Setup  ----------*/
const ApiRouter = Router();

/*==================================
=            ApiRouter            =
==================================*/

ApiRouter.route('/user')
  .get((req, res, next) => {
    res.send('get');
  })
  .post((req, res, next) => {
    res.send('post');
  })
  .put((req, res, next) => {
    res.send('put');
  })
  .delete((req, res, next) => {
    res.send('delete');
  });

ApiRouter.post('/user/signup', (req, res) => {

  // Validate the post PARAMS
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(422).send({
    message: 'Missing Paramaters In Request',
  });

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
        message: 'Login OK',
      });
    })
    .catch((err) => {

      // eslint-disable-next-line
      const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;

      // Catch duplicate creation
      if (err.code === 11000) {
        const key = err.message.match(regex)[1];
        const value = (key === 'username') ? username : email;
        return res.status(409).send({
          message: `The ${key} '${value}' already exists`,
          key,
          value,
        });
      }

      // Log and close the response
      log.error(err.message);
      res.status(500).send({
        message: 'Server Error, Oops',
      });
    });

});

/*=====  End of ApiRouter  ======*/

module.exports = ApiRouter;
