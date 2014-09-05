'use strict';

var User = require('./User.model.js');
var db = require('../../config/neo4j').db;


// Creates a new native Parse user account and new neo4j user.
exports.create = function (req, res) {
  User.create(req.body, function(error, data) {
    if (error) {
      return res.status(401).send(error);
    }
    res.status(201).json(data);
  });
};

// Login a native user through Parse.
exports.login = function (req, res) {
  User.login(req.body.username, req.body.password, function(error, data) {
    if (error) {
      return res.status(401).send(error);
    }
    res.status(200).json(data);
  });
};

// Updates existing Facebook user with new token or creates a new user from Facebook info.
exports.fbLogin = function (req, res) {
  User.fbLogin(req.body, function(error, data) {
    if (error) {
      return res.status(401).send(error);
    }
    res.status(200).json(data);
  });
};

// Creates a new native Parse user account and new neo4j user.
exports.getByParseUsername = function (req, res) {
  User.findByParseUsername(req.params.id, function(error, data) {
    if (error) {
      return res.status(401).send(error);
    }
    res.status(201).json(data);
  });
};

exports.updateParseUser = function (req, res) {
  User.updateParseUser(req.params.id, req.body, function(error, data) {
    if (error) {
      return res.status(401).send(error);
    }
    res.status(201).json(data);
  });
};

exports.collectItem = function(req, res){
  User
    .collectItem(req.params.id, req.body.item_id, req.params.method)
    .then(function (data){
      res.status(200);
      res.json(data);
    })
    .catch(function (msg){
      res.status(404);
      res.send(msg);
    })

}

exports.bookmarkItem = function(req, res){
  User
    .bookmarkItem(req.params.id, req.body.item_id, req.params.method)
    .then(function (data){
      res.status(200);
      res.json(data);
    })
    .catch(function (msg){

      res.status(404);
      res.send(msg);
    })
};

exports.getUserData = function(req, res){
  User.getUserData(req.params.id, req.params.data)
    .then( function ( data ){
      res.status( 200 );
      res.json( data );
    })
    .catch( function ( error ){
      res.status(404);
      res.send(error);
    })
}
