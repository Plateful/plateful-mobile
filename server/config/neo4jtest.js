/*
 * Initialize environment wth test data for each test.
 * Quickly recreate a test Neo4j database with these parameters.
 */

var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');

module.exports.neo4jtest = {
  initialize: function(cb){
    var q = [
      "CREATE (u:USER {username: 'TestUser'}) ",
      "CREATE (u)-[:HAS_BOOKMARKS]->(d:USER_BOOKMARKS) ",
      "CREATE (u)-[:HAS_COLLECTIONS]->(c:USER_COLLECTIONS) ",
      "CREATE (d)-[:BOOKMARKED]->(:ITEM {name: 'Duck Confit'}) ",
      "CREATE (d)-[:BOOKMARKED]->(:ITEM {name: 'Fantastic Bowl'}) ",
      "CREATE (d)-[:BOOKMARKED]->(:ITEM {name: '21 Hayes'}) ",
      "CREATE (c)-[:COLLECTED]->(:ITEM {name: 'Chesapeake Bay Soft Shell Crab Salad'}) ",
      "CREATE (c)-[:COLLECTED]->(:ITEM {name: 'Goat Cheese Cake and Beet Ice Cream'})"
    ].join('');
    db.cypherQuery(q, function(err, result){
      cb();
    });
  },
  clear: function(cb){
    var q = [
      "MATCH (n) ",
      "OPTIONAL MATCH (n)-[r]-() ",
      "DELETE n, r;"
    ].join('');
    db.cypherQuery(q, function(err, result){
      // if(err){
      //   console.log(err);
      // }
      // console.log(result);
      cb();
    });
  }
};
