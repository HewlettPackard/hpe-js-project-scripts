// (C) Copyright 2022 Hewlett Packard Enterprise Development LP.

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    eslintrc: './src/config/eslintrc.js',
    prettierrc: './src/config/prettierrc.js',
    index: './index.js'
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
    new CopyWebpackPlugin({
      patterns: [{ from: './README.md' }, { from: './package.json' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
