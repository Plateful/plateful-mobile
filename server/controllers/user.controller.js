'use strict';

var Parse = require('../config/parse.js');
var Facebook = require('../config/api/facebook.js');
var request = require('request');
var Promise = require("bluebird");
var db = require('../config/neo4j').db;
Promise.promisifyAll(request);
Promise.promisifyAll(db);

// Creates a new native Parse user.
exports.create = function (req, res) {
  var newParseUserData = {
    username: req.body.username,
    password: req.body.password
  };
  
  return createParseUser(newParseUserData)
    .then(function(completeUser) {
      console.log(completeUser);
      // Check for Facebook session ID and use for local storage token.
      if (completeUser.attributes.fbSessionId) {
        completeUser.attributes.token = completeUser.attributes.fbSessionId;
      }
      else {
        completeUser.attributes.token = completeUser._sessionToken;
      }
      res.status(201).json(completeUser);
    }, function(error) {
      // Any errors upstream will be caught and handled here.
      error.error = true;
      res.send(error);
    });
};

exports.login = function (req, res) {
  Parse.User.logIn(req.body.username, req.body.password, {
    success: function(data) {
      data.attributes.token = data._sessionToken;
      res.json(data);
    },
    error: function(data, error) {
      error.error = true;
      res.send(error);
    }
  });
};

// Retrieves a long term token for Facebook.
// Updates existing user info with new token or creates a new user from Facebook info.
exports.fbLogin = function (req, res) {
  var fbLongToken;
  request.getAsync(
    // Format request to Facebook API for long term token.
    'https://graph.facebook.com/oauth/access_token?' +
    'grant_type=fb_exchange_token&' +
    'client_id=' + Facebook.appId + '&' +
    'client_secret=' + Facebook.appSecret + '&' +
    'fb_exchange_token=' + req.body.token)
      .get(1)
      .then(function(body) {
        // Parse the long token returned from Facebook.
        fbLongToken = body.split('&')[0].split('=')[1];
        return findUserByFbId(req.body.fbId);
      })
      .then(function(foundFbUser) {
        // Update user info for an existing Facebook connected user.
        if (foundFbUser.length > 0) {
          return updateFbUser(
            foundFbUser[0].id, 
            req.body.fbId, 
            req.body.email, 
            fbLongToken, 
            req.body.photo
          );
        }
        // Else search for an existing native user.
        return findUserByNativeId(req.body.username)
          .then(function(foundNativeId) {
            // Update user info for an existing native user.
            if (foundNativeId.length > 0) {
              return updateFbUser(
                foundNativeId[0].id, 
                req.body.fbId, 
                req.body.email, 
                fbLongToken, 
                req.body.photo
              );
            }
            // Else create a new user from the Facebook data.
            return createFbUser(
              req.body.fbId, 
              req.body.email, 
              fbLongToken, 
              req.body.photo
            );
          });
      })
      .then(function(data) {
        // Needs to be fixed.
        data.attributes.token = data._sessionToken;
        res.json(data);
      })
      .catch(function(error) {
        console.log('fbLogin ERROR: ', error);
        res.status(500).send(error);
      });
};

// Search for existing native user by username.
// Returns the found user object or empty array as a promise.
var findUserByNativeId = function(username) {
  var query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  return query.find();
};

// Search for existing user by Facebook ID.
// Returns the found user object or empty array as a promise.
var findUserByFbId = function(fbId) {
  var query = new Parse.Query(Parse.User);
  query.equalTo('fbId', fbId);
  return query.find();
};

// Creates a Parse user and Neo4j user. Returns the new parse user as a promise.
var createParseUser = function(newUserData, res) {
  var user = new Parse.User();
  var newParseUser;
  user.set(newUserData);
  return user.signUp()
    .then(function(createdParseUser) {
      console.log('newParseUser', newParseUser);
      newParseUser = createdParseUser
      var neoParams = {
        username: newParseUser.attributes.username,
        parseId: newParseUser.id
      };
      return createNeo4jUser(neoParams)
    })
    .then(function(newNeoUser) {
      console.log('neoresult', newNeoUser);
      console.log('neoData', newNeoUser)
      var neoId = newNeoUser.data[0]._id;
      newParseUser.set('neoId', neoId);
      return newParseUser.save()
    })
}

var createNeo4jUser = function(data, callback) {
  console.log("hey")
  var params = {
    dataToCreateUser: {
      username: data.username,
      parse_id: data.parseId
    }
  };
  console.log(data);
  var q = "CREATE (u:USER {dataToCreateUser}) RETURN u";
  return db.cypherQueryAsync(q, params);
}

// Create new user from Facebook connect info.
// Returns the new user object as a promise.
var createFbUser = function(fbId, email, fbLongToken, photoUrl) {
  var user = new Parse.User();
  user.set({
    username:     fbId,
    password:     Date.now().toString(),
    fbEmail:      email,
    fbId:         fbId,
    fbSessionId:  fbLongToken,
    fbPic:        photoUrl
  });
  return user.signUp(null);
};

// Update user from Facebook connect info.
// Returns the updated user object. Does not return a promise.
var updateFbUser = function(parseId, fbId, email, fbLongToken, photoUrl) {
  // Master key is required to change user fields when session ID is not present.
  Parse.Cloud.useMasterKey();

  // Find user.
  var query = new Parse.Query(Parse.User);

  // Update user's Facebook related fields and return the updated user.
  return query.get(parseId)
    .then(function(user) {
      user.set({
        fbEmail:      email,
        fbId:         fbId,
        fbSessionId:  fbLongToken,
        fbPic:        photoUrl
      });
      return user.save();
    })
    .then(function(updatedUser) {
      return updatedUser;
    });
};

// X1 Config API key from parse.
// X2 Look at parse's node module.
// X3 Read parse docs re oAuth with module
// X4 Set up a route to handle auth
  // XDon't start with login - we don't have a user yet
  // XFirst set up route to create user on our end / non-auth related.
  // XGo to client and make sure we can create a user
  // When we get a request from user, store the user in local storage.
// X5 Sign up users with email/password
// X6 Make a login route - login/logout and store info 
// X7 Integrate with FB/Google, etc.

// Figure out how to use parse users with neo4j users
