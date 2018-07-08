/*----------  Vendor Imports  ----------*/
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

/*----------  Setup  ----------*/
const readFileAsync = promisify(fs.readFile);

/*----------  Main Export  ----------*/
export default (async function () {

  // Load the Babel Config from .babelrc
  let babelRc;
  try {
    babelRc = await readFileAsync(
      path.resolve(__dirname, '../.babelrc'), 
      {encoding: 'utf8'},
    );
    babelRc = JSON.parse(babelRc);
  } catch (e) {
    throw e;
  }

  return {

    entry: {
      polyfill: '@babel/polyfill',
      app: path.resolve(__dirname, '../src/index.jsx'),
    },

    output: {
      filename: '[name]-[chunkhash:8].bundle.js',
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
            loader: '@babel/loader',
            options: babelRc,
          },
        },
      ],
    },

  };

})();


