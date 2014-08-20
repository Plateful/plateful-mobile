var db = require('../config/neo4j').db;
var Q = require('q');


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

User.prototype.create = function(user_id, user, callback) {
  var params = {
    user_id: Number(user_id),
    review: user
  };
  var q = "";
  this.query(q, params(function(err, result) {
    callback(err, data);
  }));
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
