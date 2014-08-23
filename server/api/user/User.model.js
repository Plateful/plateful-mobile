var db = require('../../config/neo4j').db;
var Q = require('q');
var Parse = require('../../config/parse.js');
var Facebook = require('../../config/api/facebook.js');
var request = require('request');
var Promise = require('bluebird');
var User = require('./User.model.js')

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

User.prototype.update = function(user_id, user, callback) {
  var params = {
    user_id: user_id,
    changes: user
  };
  var q = "";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

var collectQueries = {
  true:  ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_COLLECTIONS]->(c)",
          "MERGE (c)-[:COLLECTED]->(i)",
          "RETURN i"].join(""),

  false: ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_COLLECTIONS]->(c)-[r:COLLECTED]->(i)",
          "DELETE r",
          "RETURN i"].join(" ")
}
var bookmarkQueries = {
  true:  ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_BOOKMARKS]->(c)",
          "MERGE (c)-[:BOOKMARKED]->(i)",
          "RETURN i"].join(""),

  false: ["START u=node({user_id}), i=node({item_id})",
          "MATCH u-[:HAS_BOOKMARKS]->(c)-[r:BOOKMARKED]->(i)",
          "DELETE r",
          "RETURN i"].join(" ")
}

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
