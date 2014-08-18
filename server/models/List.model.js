var db = require('../config/neo4j').db;
var _ = require('lodash');

var List = function() {};

// Return the user's bookmarks and collections.
List.prototype.show = function(username, callback) {
  var params = {
    username: username
  };
  var q = "MATCH (u:USER {username: {username}})-[:HAS_BOOKMARKS]->(b:USER_BOOKMARKS), \
                 (b)-[:BOOKMARKED]->(i:ITEM) \
           WITH u, collect(i) as bookmarks \
           MATCH (u)-[:HAS_COLLECTIONS]->(c:USER_COLLECTIONS), \
                 (c)-[:COLLECTED]->(d:ITEM) \
           RETURN bookmarks, collect(d) as collections";

  db.cypherQuery(q, params, function(err, result) {
    var returnData = [];
    if (result.data.length){
      returnData = _.map(result.data[0][0].concat(result.data[0][1]), function(item, index){
        return item.data;
      });
    }
    callback(err, returnData);
  });
};

module.exports = new List();
