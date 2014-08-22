var request = require('supertest'),
    should = require('should'),
    app = require('../../app.js'),
    neo4jtest = require('../../config/neo4jtest.js').neo4jtest,
    url = '/api/v1';


describe('User API', function() {
  var username = 'newuser';
  var password = 'yolo';
  before(function(done){
    neo4jtest.initialize(function(){
      done();
    });
  });
  after(function(done){
    neo4jtest.clear(function(){
      done();
    });
  });
  describe('POST /users/signup', function() {
    it('should return a new user for unique username', function(done) {
      request(app)
        .post(url + '/users/signup')
        .send({ username: username, password: password})
        .expect(201)
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          (data.username).should.be.exactly(username);
          (data.neoId).should.be.above(0);
          data.should.have.property('objectId');
          data.should.have.property('token');
          done();
        });
    });
    it('should return an error message if the username is taken', function(done) {
      request(app)
        .post(url + '/users/signup')
        .send({ username: username, password: password})
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          (data.message).should.be.exactly('username newuser already taken');
          done();
        });
    });
  });
  describe('POST /users/login', function() {
    it('should return a logged in user for existing user', function(done) {
      request(app)
        .post(url + '/users/login')
        .send({ username: username, password: password})
        .expect(200)
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          (data.username).should.be.exactly(username);
          (data.neoId).should.be.above(0);
          data.should.have.property('objectId');
          data.should.have.property('token');
          done();
        });
    });
    it('should return an error when an invalid password is entered', function(done) {
      request(app)
        .post(url + '/users/login')
        .send({ username: username, password: password + 'wrong'})
        .expect(200)
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          (data.message).should.be.exactly('invalid login parameters');
          done();
        });
    });
    it('should return an error when an unregistered user tries to log in', function(done) {
      request(app)
        .post(url + '/users/login')
        .send({ username: username + 'unregistered', password: password})
        .expect(200)
        .end(function(err, res) {
          var data = JSON.parse(res.text);
          (data.message).should.be.exactly('invalid login parameters');
          done();
        });
    });
  });
});
