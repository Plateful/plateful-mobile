"use restrict";

var Parse = require('../config/parse.js');
var Facebook = require('../config/api/facebook.js');
var request = require('request');
var url = require('url');
var Promise = require("bluebird");
Promise.promisifyAll(request);

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
  var fbLongToken;
  request.getAsync(
    'https://graph.facebook.com/oauth/access_token?' +
    'grant_type=fb_exchange_token&' +
    'client_id=' + Facebook.appId + '&' +
    'client_secret=' + Facebook.appSecret + '&' +
    'fb_exchange_token=' + req.body.token)
      .get(1)
      .then(function(body) {
        fbLongToken = body.split('&')[0].split('=')[1];
        return findUserByFbId(req.body.fbId);
      })
      .then(function(foundFbUser) {
        if (foundFbUser.length > 0) {
          console.log('found fb user: ', foundFbUser[0].id);
          return updateFbUser(foundFbUser[0].id, req.body.fbId, req.body.email, fbLongToken, req.body.photo);
          // return new Promise( function(resolve, reject) { resolve(data) })
        }
        return findUserByNativeId(req.body.username)
          .then(function(foundNativeId) {
            if (foundNativeId.length > 0) {
              console.log('found NATIVE user: ', foundNativeId)
              return updateFbUser(foundNativeId[0].id, req.body.fbId, req.body.email, fbLongToken, req.body.photo);
            }
            return createFbUser(
              req.body.fbId, 
              req.body.email, 
              fbLongToken, 
              req.body.photo
            );
          });
        // console.log('here you go',data)
        // return res.status(200).send('yolo');
        // return createFbUser(req.body.fbId, req.body.email, fbLongToken, req.body.photo);
      })
      .then(function(data) {
        // Remember update session token for FB.
        // console.log('Data:',data);
        console.log('attributes:',data.attributes);
        data.attributes.token = data._sessionToken;
        res.json(data);
      })
      .catch(function(error) {
        console.log('fbLogin ERROR: ', error);
        res.status(401).send(error);
      });
}


// Search for existing native user by username.
var findUserByNativeId = function(username) {
  console.log('finding by native username')
  var query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  return query.find();
}

// Search for existing user by Facebook ID.
var findUserByFbId = function(fbId) {
  console.log('finding by FB ID')
  var query = new Parse.Query(Parse.User);
  query.equalTo('fbId', fbId);
  return query.find();
}

// Create new user from Facebook connect info.
var createFbUser = function(fbId, email, fbLongToken, photoUrl) {
  var user = new Parse.User();
  console.log("new user signup")
  user.set({
    username:     fbId,
    password:     Date.now().toString(),
    fbEmail:      email,
    fbId:         fbId,
    fbSessionId:  fbLongToken,
    fbPic:        photoUrl
  });
  return user.signUp(null);
}

// Update user from Facebook connect info.
var updateFbUser = function(parseId, fbId, email, fbLongToken, photoUrl) {
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
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
    .then(function(data) {
      return data;
    });
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
