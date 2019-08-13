// (C) Copyright 2019 Hewlett Packard Enterprise Development LP.

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    eslintrc: './src/config/eslintrc.js',
    prettierrc: './src/config/prettierrc.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: 'ProjectScripts',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './README.md' },
      { from: './package.json' },
    ]),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
