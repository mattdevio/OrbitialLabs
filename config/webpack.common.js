/*----------  Vendor Imports  ----------*/
import webpack from 'webpack';
import path from 'path';

/*----------  Custom Imports  ----------*/
import * as config from 'config.js';

export default {

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

};
