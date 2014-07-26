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
    port: process.env.PORT || 9000,
    seedDB: false,
    secrets: {
      session: 'tester-secret'
    },
    userRoles: ['guest', 'user', 'admin'],
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
    facebook: {
      clientID: process.env.FACEBOOK_ID || 'id',
      clientSecret: process.env.FACEBOOK_SECRET || 'secret',
      callbackURL: 'http://localhost:9000/auth/facebook/callback'
    },
    twitter: {
      clientID: process.env.TWITTER_ID || 'id',
      clientSecret: process.env.TWITTER_SECRET || 'secret',
      callbackURL: 'http://localhost:9000/auth/twitter/callback'
    },
    google: {
      clientID: process.env.GOOGLE_ID || 'id',
      clientSecret: process.env.GOOGLE_SECRET || 'secret',
      callbackURL: 'http://localhost:9000/auth/google/callback'
    }
  };

  module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});

}).call(this);
