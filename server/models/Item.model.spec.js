var request = require('supertest'),
    should = require('should'),
    app = require('../app'),
    neo4jtest = require('../config/neo4jtest.js').neo4jtest,
    url = '/api/v1';


describe('List API', function() {
  console.log(neo4jtest);
  beforeEach(function(done){
    neo4jtest.initialize(function(){
      done();
    });
  });
  afterEach(function(done){
    neo4jtest.clear(function(){
      done();
    });
  });
  describe('', function() {
  //   var data = 10;
  //   it('should return an array of bookmarks and collections', function(done) {
  //     request(app)
  //       .get(url + '/lists/TestUser')
  //       .expect(200)
  //       .end(function(err, res) {
  //         data = JSON.parse(res.text);
  //         (Array.isArray(data.itemArray)).should.be.exactly(true);
  //         done();
  //       });
  //   });
  //   it('should return the correct items', function() {
  //     (data.itemArray.length).should.be.exactly(5);
  //     (data.itemArray[0].name).should.be.exactly('Duck Confit');
  //     (data.itemArray[4].name).should.be.exactly('Goat Cheese Cake and Beet Ice Cream');
  //   });
  });
});
