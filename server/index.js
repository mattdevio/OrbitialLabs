/*----------  Vendor Imports  ----------*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const path = require('path');
const common = require('../config/webpack.common.js');
const merge = require('webpack-merge');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

/*----------  Custom Imports  ----------*/
const util = require('./lib/utility').getInstance();
const FileRouter = require('./router/file');
const ApiRouter = require('./router/api');
const BindEventMiddleware = require('./events');

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
const server = http.Server(app);

// Start Socket.IO & Bind Event Middleware
const io = socketIO(server, {
  serveClient: false,
  path: '/chat',
});
BindEventMiddleware(io);

// Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));
app.use('/assets', express.static(path.resolve(__dirname, './assets')));
app.use('/favicon.ico', express.static(path.resolve(__dirname, './assets/images/favicon.png')));

// Open mongoose DB connection
mongoose.connect('mongodb://localhost:27017/PublicSquare', { useNewUrlParser: true });

// Bind Listening Port
server.listen(config.port, () => {
  util.log(`Server is listening on http://localhost:${config.port}`);
});

// Serve webpack bundles
(async () => {
  
  const baseConfig = await common();
  const fullWebpackConfig = merge(baseConfig, webpackConfig);
  const compiler = webpack(fullWebpackConfig);

  app.use(wdm(compiler, {
    publicPath: fullWebpackConfig.output.publicPath,
  }));

  // Mount Routers
  app.use('/api', ApiRouter);
  app.use(FileRouter); // This one has to come last

})();
