// (C) Copyright 2019 Hewlett Packard Enterprise Development LP.

const path = require('path');

const eslintPath = path.join(__dirname, 'dist', 'eslintrc');
const prettierPath = path.join(__dirname, 'dist', 'prettierrc');

module.exports = {
  eslint: require(eslintPath),
  prettier: require(prettierPath),
};
