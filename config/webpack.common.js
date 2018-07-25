/*----------  Vendor Imports  ----------*/
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/*----------  Setup  ----------*/
const readFileAsync = promisify(fs.readFile);

/*----------  Main Export  ----------*/
module.exports = async function () {

  // Load the Babel Config from .babelrc
  let babelRc;
  try {
    babelRc = await readFileAsync(
      path.resolve(__dirname, '../.babelrc'), 
      {encoding: 'utf8'},
    );
    babelRc = JSON.parse(babelRc);
  } catch (e) {
    console.log(e);
  }

  return {

    entry: {
      polyfill: '@babel/polyfill',
      app: path.resolve(__dirname, '../src/index.jsx'),
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../public'),
      publicPath: '/',
    },

    resolve: {
      extensions: ['.jsx', '.js'],
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    },

    module: {
      rules: [
        { // Transpile es6 and react jsx into web-safe code
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: babelRc,
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
    ],

  };

};


