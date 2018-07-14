/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Setup  ----------*/
const ApiRouter = Router();

/*==================================
=            ApiRouter            =
==================================*/

ApiRouter.get('/', (req, res, next) => {

  res.json({
    message: 'Hello World!',
  })

});

/*=====  End of ApiRouter  ======*/

module.exports = ApiRouter;