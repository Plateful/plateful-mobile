'use strict';

var Parse = require('../config/parse.js');
var Facebook = require('../config/api/facebook.js');
var request = require('request');
var Promise = require("bluebird");
var User = require('../models/User.model.js')

var db = require('../config/neo4j').db;
Promise.promisifyAll(request);
Promise.promisifyAll(db);


exports.collectItem = function(req, res){
  // console.log(req.body)
  User
    .collectItem(req.params.id, req.body.item_id, req.params.method)
    .then(function (data){
      // console.log()
      res.status(200)
      res.json(data)
    })
    .catch(function (msg){

      res.status(404)
      res.send(msg)
    })

}

exports.bookmarkItem = function(req, res){
  // console.log(req.body)
  User
    .bookmarkItem(req.params.id, req.body.item_id, req.params.method)
    .then(function (data){
      // console.log()
      res.status(200)
      res.json(data)
    })
    .catch(function (msg){

      res.status(404)
      res.send(msg)
    })
};

exports.getUserData = function(req, res){
  // console.log("from controller",)
  User.getUserData(req.params.id, req.params.data)
    .then( function ( data ){
      res.status( 200 )
      res.json( data )
    })
    .catch( function ( error ){
      res.status(404)
      res.send(error)
    })
}


// Creates a new native Parse user.
exports.create = function (req, res) {
  var newParseUserData = {
    username: req.body.username,
    password: req.body.password
  };

  return createParseUser(newParseUserData)
    .then(function(completeUser) {
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
  Parse.User.logIn(req.body.username, req.body.password)
    .then(function(data) {
      data.attributes.token = data._sessionToken;
      res.json(data);
    }, function(error) {
      error.error = true;
      res.send(error);
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
      .then(function(fbUser) {
        fbUser.attributes.token = fbUser._sessionToken;
        res.json(fbUser);
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

// Creates a new Parse and Neo4j user each with references to each other's ID.
// Returns the new Parse user as a promise.
var createParseUser = function(newUserData, res) {
  var user = new Parse.User();
  var newParseUser;
  user.set(newUserData);

  // Creates a new Parse user.
  return user.signUp()
    .then(function(createdParseUser) {
      newParseUser = createdParseUser
      var neoParams = {
        username: newParseUser.attributes.username,
        parseId: newParseUser.id
      };

      // Create a new neo4j user.
      return createNeo4jUser(neoParams)
    })
    .then(function(newNeoUser) {
      // Stores the neo4j id with the new Parse user and saves the user.
      var neoId = newNeoUser.data[0]._id;
      newParseUser.set('neoId', neoId);

      return newParseUser.save()
    });
}

// Creates new neo4j user from Parse username and ID. Returns the new neo4j user as a promise.
var createNeo4jUser = function(data, callback) {
  var params = {
    dataToCreateUser: {
      username: data.username,
      parse_id: data.parseId
    }
  };
  var q = ["CREATE (u:USER {dataToCreateUser})",
          "CREATE (u)-[:HAS_BOOKMARKS]->(:USER_BOOKMARKS)",
          "CREATE (u)-[:HAS_COLLECTIONS]->(:USER_COLLECTIONS)",
          "CREATE (u)-[:HAS_PHOTOS]->(:USER_PHOTOS)",
          "CREATE (u)-[:HAS_REVIEWS]->(:USER_REVIEWS)",
          "RETURN u"].join("");
  return db.cypherQueryAsync(q, params);
}

// Create new user from Facebook connect info.
// Returns the new user object as a promise.
var createFbUser = function(fbId, email, fbLongToken, photoUrl) {
  var newParseUserData = {
    username:     fbId,
    password:     Date.now().toString(),
    fbEmail:      email,
    fbId:         fbId,
    fbSessionId:  fbLongToken,
    fbPic:        photoUrl
  };
  return createParseUser(newParseUserData);
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




