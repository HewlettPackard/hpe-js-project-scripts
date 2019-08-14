// (C) Copyright 2019 Hewlett Packard Enterprise Development LP.

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: '',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'commonjs react',
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
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
        },
      },
    ],
  },
};
