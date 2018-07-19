/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Setup  ----------*/
const FileRouter = Router();

/*==================================
=            FileRouter            =
==================================*/

FileRouter.get('*', (req, res, next) => {

  res.render('index', {
    bundles: ['app.bundle.js', 'polyfill.bundle.js'],
  });

});

/*=====  End of FileRouter  ======*/

module.exports = FileRouter;
