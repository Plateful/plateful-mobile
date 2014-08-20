'use strict';

var path = require('path');
var _ = require('lodash');

var requiredProcessEnv = function(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  process.env[name];
};

// All configurations will extend these options.
var all = {
  env: process.env.NODE_ENV,

  // Root path of server.
  root: path.normalize(__dirname + '/../../..'),

  // Server port.
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data.
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable.
  secrets: {
    session: 'tester-secret'
  },

  // List of user roles.
  userRoles: ['guest', 'user', 'admin'],

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  'http://localhost:9000/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  'http://localhost:9000/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  'http://localhost:9000/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV.
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
