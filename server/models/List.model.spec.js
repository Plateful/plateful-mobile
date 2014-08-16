var request = require('supertest'),
    express = require('express'),
    app = require('../app'),
    db = require('../config/neo4j.js').db,
    url = '/api/v1';


describe('List API', function() {
  before(function(done) {
    var q = [
      "CREATE (u:USER {username: 'TestUser'}) ",
      "CREATE (u)-[:HAS_BOOKMARKS]->(d:USER_BOOKMARKS) ",
      "CREATE (u)-[:HAS_COLLECTIONS]->(d:USER_COLLECTIONS) ",
      "CREATE d-[:BOOKMARKED]->(i:ITEM{name: 'Duck Confit'}) ",
      "CREATE d-[:BOOKMARKED]->(i:ITEM{name: 'Fantastic Bowl'}) ",
      "CREATE d-[:BOOKMARKED]->(i:ITEM{name: '21 Hayes'}) ",
      "CREATE d-[:COLLECTED]->(i:ITEM{name: 'Chesapeake Bay Soft Shell Crab Salad'}) ",
      "CREATE d-[:COLLECTED]->(i:ITEM{name: 'Goat Cheese Cake and Beet Ice Cream'})"
    ].join('');
    db.cypherQuery(q, function(err, result) {
      done();
    });
  });
  after(function() {
    var q = [
      "Match (u:USER{username:'TestUser'})-[hb:HAS_BOOKMARKS]->(ub:USER_BOOKMARKS)-[b:BOOKMARKED]->(),",
      "Match (u)-[hc:HAS_COLLECTIONS]->(uc:USER_COLLECTIONS)-[c:COLLECTED]->() ",
      "DELETE u, hb, ub, b, hc, uc, c"
    ].join('');
    db.cypherQuery(q, function(err, result) {
      done();
    });
  })
  describe('GET /lists', function() {
    it('should return an array of bookmarks and collections', function(done) {
      request(app)
        .get(url + '/lists/John')
        .expect(200)
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          assert.equal(Array.isArray(data.itemArray), true);
          assert.equal(data.itemArray.length, 5);
          assert.equal(data.itemArray[0], 'Duck Confit');
          done();
        });
    });
  });
});