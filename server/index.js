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
const FileRouter = require('./router/file');
const ApiRouter = require('./router/api');

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

// Add Middleware
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));
app.use('/assets', express.static(path.resolve(__dirname, './assets')));

// Mount Routers
app.use(FileRouter);
app.use('api', ApiRouter);

// Bind Listening Port
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
