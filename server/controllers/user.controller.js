'use strict';

var Parse = require('../config/parse.js');

exports.create = function (req, res) {
  var user = new Parse.User();
  user.set('username', 'John Wang');
  user.set('password', 'yolo');
  user.set('email', 'yolo3@yolo.com');

  user.signUp(null, {
    success: function(result) {
      console.log(result);
      res.json(result);
    },
    error: function(result, err) {
      console.log(err);
      console.log(result);
    }
  })
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
