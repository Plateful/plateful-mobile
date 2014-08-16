var request = require('supertest'),
    should = require('should'),
    app = require('../app'),
    db = require('../config/neo4j.js').db,
    url = '/api/v1';


describe('List API', function() {
  before(function(done) {
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
    db.cypherQuery(q, function(err, result) {
      done();
    });
  });
  after(function(done) {
    var q = [
      "MATCH (u:USER{username:'TestUser'})-[hb:HAS_BOOKMARKS]->(ub:USER_BOOKMARKS)-[b:BOOKMARKED]->(),",
      "(u)-[hc:HAS_COLLECTIONS]->(uc:USER_COLLECTIONS)-[c:COLLECTED]->() ",
      "DELETE u, hb, ub, b, hc, uc, c"
    ].join('');
    db.cypherQuery(q, function(err, result) {
      done();
    });
  })
  describe('GET /lists', function() {
    var data = 10;
    it('should return an array of bookmarks and collections', function(done) {
      request(app)
        .get(url + '/lists/TestUser')
        .expect(200)
        .end(function(err, res) {
          data = JSON.parse(res.text);
          (Array.isArray(data.itemArray)).should.be.exactly(true);
          done();
        });
    });
    it('should return the correct items', function() {
      (data.itemArray.length).should.be.exactly(5);
      (data.itemArray[0].name).should.be.exactly('Duck Confit');
      (data.itemArray[4].name).should.be.exactly('Goat Cheese Cake and Beet Ice Cream');
    });
  });
});