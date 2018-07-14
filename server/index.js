/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const path = require('path');
const babel = require('@babel/core');
const common = require('../config/webpack.common.js');
const merge = require('webpack-merge');

/*----------  Custom Imports  ----------*/
const { log } = require('./utility');

// Server Configuration Object
const config = {
  port: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Webpack Config
const webpackConfig = config.NODE_ENV === 'development' ?
  require('../config/webpack.dev.js') :
  require('../config/webpack.prod.js');

// Start Express
const app = express();
app.use(morgan('dev'));
app.listen(config.port, () => {
  log.info(`Server is listening on http://localhost:${config.port}`);
});

// Serve webpack bundles
(async () => {
  
  const baseConfig = await common();
  const fullWebpackConfig = merge(baseConfig, webpackConfig);
  const compiler = webpack(fullWebpackConfig);

  app.use(wdm(compiler, {
    publicPath: fullWebpackConfig.output.publicPath,
  }))

})();
