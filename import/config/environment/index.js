(function() {
  'use strict';
  var all, path, requiredProcessEnv, _;

  path = require('path');

  _ = require('lodash');

  requiredProcessEnv = function(name) {
    if (!process.env[name]) {
      throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
  };

  all = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 7777
  };

  module.exports = all;

}).call(this);
