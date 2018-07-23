/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*----------  Custom Imports  ----------*/
const util = require('../lib/utility').getInstance();

/*----------  Setup  ----------*/
const FileRouter = Router();

/*==================================
=            FileRouter            =
==================================*/

FileRouter.get('*', (req, res) => {

  try {
    res.render('index', {
      bundles: ['app.bundle.js', 'polyfill.bundle.js'],
    });
  } catch (e) {
    util.error(e.message);
    res.status(500).end();
  }

});

/*=====  End of FileRouter  ======*/

module.exports = FileRouter;
