'use strict';

var _ = require('lodash');
var http = require('http');
var storeData = require('./storeData');

// NEO4J API
var db = require('../config/neo4j').db;

// LOCU API
var Venue = require('../config/api/locu').VenueClient;

// FACTUAL API
var factual = require('../config/api/factual').factual;

// YELP API
var yelp = require('../config/api/yelp').yelp;

// Menu Model
var Menu = require('../models/Menu.model');

exports.index = function(req, res) {
  Menu.all(function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

exports.getByLocation = function(req, res) {
  Menu.getByLocation(req.body, function(err, results) {
    if (err) {
      return handleError(res, err);
    }
    res.json(200, results);
  })
};

// This comment below is for an api call to the Factual api.
// Factual is much faster than the Venu (locu) api
// We are using locu for menu data
// Ask Joel Before changing
// TODO: Configure google places on the front end to eliminate the need for api calls on restful routes
// factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}}
// ,(err, result)->
//   if err then return handleError(res, err)
//   res.json(200, result.data)
// )

// Get a single Business
// http://localhost:9000/api/menus/30
// working but must change HAS_ITEM to HAS to test
exports.show = function(req, res) {
  Menu.find(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    console.log(data)
    res.json(200, data);
  });
};

exports.getMenuItems = function(req, res){
  Menu.getMenuItems(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(200, data);
  });
};

// Creates a new Business in the DB.
// http://localhost:9000/api/menus/
exports.create = function(req, res) {
  Menu.create(req.body.menu, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  console.log(req.body);
  // res.json("hello");
  Menu.update(res, req.params.id, req.body, function(err, data) {
    res.json(201, data);
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Menu.destroy(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// Use this to handle errors
var handleError = function(res, err) {
  return res.send(500, err);
};

// For bitmapping images as they come in
var base64_encode = function(bitmap) {
  return new Buffer(bitmap).toString('base64');
};
