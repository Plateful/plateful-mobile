"use restrict";

var Parse = require('../config/parse.js');
var Facebook = require('../config/api/facebook.js');
var request = require('request');
var url = require('url')

exports.create = function (req, res) {
  var user = new Parse.User();
  user.set('username', req.body.username);
  user.set('password', req.body.password);

  user.signUp(null, {
    success: function(data) {
      data.attributes.token = data._sessionToken;
      res.json(data);
    },
    error: function(data, err) {
      console.log(err);
    }
  });
};

exports.login = function (req, res) {
  Parse.User.logIn(req.body.username, req.body.password, {
    success: function(data) {
      data.attributes.token = data._sessionToken;
      res.json(data);
    },
    error: function(data, error) {
      console.log(error);
    }
  });
};

exports.fbLogin = function (req, res) {
  var fbTempToken = req.body.token;
  request.get(
    'https://graph.facebook.com/oauth/access_token?' +
    'grant_type=fb_exchange_token&' +
    'client_id=' + Facebook.appId + '&' +
    'client_secret=' + Facebook.appSecret + '&' +
    'fb_exchange_token=' + fbTempToken,
    function(error, response, body) {
      var fbLongToken = body.split('&')[0].split('=')[1];

      var user = new Parse.User();
      user.set('username', req.body.fbId);
      user.set('password', Date.now().toString());
      user.set('email', req.body.email);
      user.set('fbId', req.body.fbId);
      user.set('fbSessionId', fbLongToken);
      user.set('profilePic', req.body.photo);

      user.signUp(null, {
        success: function(data) {
          data.attributes.token = data._sessionToken;
          res.json(data);
        },
        error: function(data, err) {
          console.log(err);
        }
      })
    }
  )
}


// X1 Config API key from parse.
// X2 Look at parse's node module.
// 3 Read parse docs re oAuth with module
// 4 Set up a route to handle auth
  // Don't start with login - we don't have a user yet
  // First set up route to create user on our end / non-auth related.
  // Go to client and make sure we can create a user
  // When we get a request from user, store the user in local storage.
// 5 Sign up users with email/password
// 6 Make a login route - login/logout and store info
// 7 Integrate with FB/Google, etc.

// Figure out how to use parse users with neo4j users
