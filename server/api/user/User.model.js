var db = require('../../config/neo4j').db;
var Q = require('q');
var Parse = require('../../config/parse.js');
var Facebook = require('../../config/api/facebook.js');
var request = require('request');
var Promise = require('bluebird');
var User = require('./User.model.js');
var _ = require('lodash');

Promise.promisifyAll(request);
Promise.promisifyAll(db);


var User = function() {
  this.query = db.cypherQuery;
};

User.prototype.all = function(callback) {
  var q = "MATCH (i:Menu) RETURN i";
  this.query(q, function(err, result) {
    callback(err, result.data);
  });
};

User.prototype.find = function(review_id, callback) {
  var params = {
    review_id: Number(review_id)
  };
  var q = "START review=node({review_id})" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN review, photo, body";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

User.prototype.findByParseUsername = function(username, callback) {
  var query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  return query.find()
    .then(function(user) {
      console.log(user)
      callback(null, user[0]);
    }, function(error) {
      error.error = true;
      callback(error, null);
    });
};

// Creates a new Parse user and new neo4j user.
User.prototype.create = function(userInfo, callback) {
  var newParseUserData = {
    username: userInfo.username,
    password: userInfo.password
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
      callback(null, completeUser);
    }, function(error) {
      // Any errors upstream will be caught and handled here.
      error.error = true;
      callback(error, null);
    });
};

// Logs in a native user through Parse.
User.prototype.login = function (username, password, callback) {
  Parse.User.logIn(username, password)
    .then(function(data) {
      data.attributes.token = data._sessionToken;
      callback(null, data);
    }, function(error) {
      error.error = true;
      callback(error, null);
    });
};

// Retrieves a long term token for Facebook.
// Updates existing user info with new token or creates a new user from Facebook info.
User.prototype.fbLogin = function (fbData, callback) {
  var fbLongToken;
  request.getAsync(
    // Format request to Facebook API for long term token.
    'https://graph.facebook.com/oauth/access_token?' +
    'grant_type=fb_exchange_token&' +
    'client_id=' + Facebook.appId + '&' +
    'client_secret=' + Facebook.appSecret + '&' +
    'fb_exchange_token=' + fbData.token)
      .get(1)
      .then(function(body) {
        // Parse the long token returned from Facebook.
        fbLongToken = body.split('&')[0].split('=')[1];
        return findUserByFbId(fbData.fbId);
      })
      .then(function(foundFbUser) {
        // Update user info for an existing Facebook connected user.
        if (foundFbUser.length > 0) {
          return updateFbUser(
            foundFbUser[0].id,
            fbData.fbId,
            fbData.email,
            fbLongToken,
            fbData.photo
          );
        }
        // Else search for an existing native user.
        return findUserByNativeId(fbData.username)
          .then(function(foundNativeId) {
            // Update user info for an existing native user.
            if (foundNativeId.length > 0) {
              return updateFbUser(
                foundNativeId[0].id,
                fbData.fbId,
                fbData.email,
                fbLongToken,
                fbData.photo
              );
            }
            // Else create a new user from the Facebook data.
            return createFbUser(
              fbData.fbId,
              fbData.email,
              fbLongToken,
              fbData.photo
            );
          });
      })
      .then(function(fbUser) {
        fbUser.attributes.token = fbUser._sessionToken;
        callback(null, fbUser);
      })
      .catch(function(error) {
        console.log('fbLogin ERROR: ', error);
        callback(error, null);
      });
};

User.prototype.updateParseUser = function(username, updateData, callback) {
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  return query.find()
    .then(function(updateUser) {
      _.forOwn(updateData, function(value, key) {
        updateUser[0].set(key, value);
      });
      return updateUser[0].save();
    })
    .then(function(updatedUser) {
      callback(null, updatedUser);
    }, function(error) {
      error.error = true;
      callback(error, null);
    });
};

var collectQueries = {
  true:  ["START u=node({user_id}), i=node({item_id})",
          "MERGE u-[:HAS_COLLECTIONS]->(c)",
          "MERGE (c)-[:COLLECTED]->(i)",
          "RETURN i"].join(""),

  false: ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_COLLECTIONS]->(c)-[r:COLLECTED]->(i)",
          "DELETE r",
          "RETURN i"].join(" ")
};

var bookmarkQueries = {
  true:  ["START u=node({user_id}), i=node({item_id})",
          "MERGE u-[:HAS_BOOKMARKS]->(c)",
          "MERGE (c)-[:BOOKMARKED]->(i)",
          "RETURN i"].join(""),

  false: ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_BOOKMARKS]->(c)-[r:BOOKMARKED]->(i)",
          "DELETE r",
          "RETURN i"].join(" ")
};

User.prototype.collectItem = function(user_id, item_id, method){
  var params = {
    user_id: Number(user_id),
    item_id: Number(item_id)
  }
  console.log(params)
  var deferred = Q.defer()
  var query = collectQueries[ method ]
  db.cypherQuery(query, params, function (err, result){

    if(err){
      console.log(err)
      return deferred.reject(new Error(err))
    }
    deferred.resolve(result.data[0])
    console.log(result.data)
  })
  return deferred.promise
}

User.prototype.bookmarkItem = function(user_id, item_id, method){
  var params = {
    user_id: Number(user_id),
    item_id: Number(item_id)
  }
  console.log(params)
  var deferred = Q.defer()
  var query = bookmarkQueries[ method ]
  db.cypherQuery(query, params, function (err, result){

    if(err){
      console.log(err)
      return deferred.reject(new Error(err))
    }
    deferred.resolve(result.data[0])
    console.log(result.data)
  })
  return deferred.promise

}

var userQuery = {
  collection: ["START user=node({user_id})",
              "MATCH user-[:HAS_COLLECTIONS]->(c)-[:COLLECTED]->(item)",
              "RETURN item"].join(""),

  reviews:    ["START user=node({user_id})",
              "MATCH user-[:HAS_REVIEWS]->(c)-[:HAS_REVIEW]->(review)",
              "RETURN review"].join(""),

  photos:     ["START user=node({user_id})",
              "MATCH user-[:HAS_PHOTOS]->(c)-[:HAS_PHOTO]->(photo)",
              "RETURN photo"].join(""),

  bookmarks:  ["START user=node({user_id})",
              "MATCH user-[:HAS_BOOKMARKS]->(c)-[:BOOKMARKED]->(bookmark)",
              "RETURN bookmark"].join("")
};


User.prototype.getUserData = function(user_id, dataType){
  var deferred  = Q.defer();
  var params    = {user_id: Number(user_id)}
  var query     = userQuery[ dataType ];
  db.cypherQuery(query, params, function (err, result){
    if(err){
      console.info('get ' +dataType+ ' fail');
      console.error(err);
      return deferred.reject(new Error(err));
    }
    console.log('get '+dataType+' success!!');
    deferred.resolve(result.data);
  });
  return deferred.promise
}

User.prototype.checkIfCollectedOrBookmarked = function(user_id, item_id){
  var params = {
    user_id: Number(user_id),
    item_id: Number(item_id)
  }
  // var query = ["START u=node({user_id}), i=node({item_id})",
  //             "MATCH u-[:HAS_COLLECTIONS]->(c)",
  //             "MATCH u-[:HAS_BOOKMARKS]->(b)",

  //             ]
              // ""
}

User.prototype.destroy = function(user_id, callback) {
  var params = {
    user_id: Number(user_id)
  };
  var q = "";
  this.query(q, params, function(err, result) {
    callback(err, data);
  });
};

module.exports = new User();



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
