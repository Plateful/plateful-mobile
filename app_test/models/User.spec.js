'use strict';
describe('User', function(){
  var User, Auth, $httpBackend
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('app'));
  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(angular.mock.inject(function(_User_, _Auth_, _$httpBackend_) {
    User = _User_;
    Auth = _Auth_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    localStorage.clear();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // tests start here
  it('Should have a get method', function(){
      expect(User.get).toBeDefined();
  });
  it('Should have a find method', function(){
      expect(User.find).toBeDefined();
  });
  it('Should have a create method', function(){
      expect(User.create).toBeDefined();
  });
  it('Should have an update method', function(){
      expect(User.update).toBeDefined();
  });
  it('Should have a destroy method', function(){
      expect(User.destroy).toBeDefined();
  });
  it('Should have a getPhotosByUser method', function(){
      expect(User.getPhotosByUser).toBeDefined();
  });
  it('Should have a getBookmarksByUser method', function(){
      expect(User.getBookmarksByUser).toBeDefined();
  });
  it('Should have a getCollectionByUser method', function(){
      expect(User.getCollectionByUser).toBeDefined();
  });
  it('Should have a getReviewsByUser method', function(){
      expect(User.getReviewsByUser).toBeDefined();
  });
  it('Should have a signup method', function(){
      expect(User.signup).toBeDefined();
  });
  it('Should have a login method', function(){
      expect(User.login).toBeDefined();
  });
  it('Should signup and return new user', function(){
    var responseData = { username : 'newuser@newb.com', token : 'sometoken123' };
    $httpBackend.expect('POST', 'http://localhost:9000/api/v1/users/signup/')
      .respond(200, responseData);

    User.signup('newuser@newb.com', 'yolo')
    $httpBackend.flush();

    expect(User.status).toBe('Account created!');
    expect(localStorage.user_email).toBe('newuser@newb.com');
    expect(localStorage.user_token).toBe('sometoken123');
  });
  it('Should not sign up user with same username', function(){
    var responseData = { error: true, message: 'Username is taken' };
    $httpBackend.expect('POST', 'http://localhost:9000/api/v1/users/signup/')
      .respond(200, responseData);

    User.signup('newuser@newb.com', 'yolo2')
    $httpBackend.flush();

    expect(User.status).toBe('Username is taken');
    expect(localStorage.user_email).toBe(undefined);
    expect(localStorage.user_token).toBe(undefined);
  });
  it('Should not sign up user with missing information', function(){
    var responseData = { error: true, message: 'No password entered' };
    $httpBackend.expect('POST', 'http://localhost:9000/api/v1/users/signup/')
      .respond(200, responseData);

    User.signup('newuser@newb.com', '')
    $httpBackend.flush();

    expect(User.status).toBe('No password entered');
    expect(localStorage.user_email).toBe(undefined);
    expect(localStorage.user_token).toBe(undefined);
  });
  it('Should login and return registered user', function(){
    var responseData = { username : 'Joelcoxio', token : 'NLQT4BUbQaxjMthw6BTFxLENO' };
    $httpBackend.expect('POST', 'http://localhost:9000/api/v1/users/login/')
      .respond(200, responseData);

    User.login('joel', 'yolo')
    $httpBackend.flush();

    expect(User.status).toBe('Logged In!');
    expect(localStorage.user_email).toBe('joel');
    expect(localStorage.user_token).toBe('123');
  });
  it('Should not log in a user with a bad login request', function(){
    var responseData = { error : true, message : 'Bad login request' };
    $httpBackend.expect('POST', 'http://localhost:9000/api/v1/users/login/')
      .respond(200, responseData);

    User.login('joel', 'yoloyolo')
    $httpBackend.flush();

    expect(User.status).toBe('Bad login request');
    expect(localStorage.user_email).toBe(undefined);
    expect(localStorage.user_token).toBe(undefined);
  });
});
