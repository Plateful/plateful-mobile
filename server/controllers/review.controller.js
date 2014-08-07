'use strict';

var _ = require('lodash');
var busboy = require('connect-busboy');
var fs = require('fs');

// NEO4J API
var db = require('../config/neo4j').db;

// FACTUAL API
var factual = require('../config/api/factual').factual;

// YELP API
var yelp = require('../config/api/yelp').yelp;

// Review Model
var Review = require('../models/Review.model');

exports.index = function(req, res) {
  Review.all(function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/business/:menu_id
// working
exports.getByMenu = function(req, res) {
  Review.findByMenu(req.params.menu_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/user/:user_id
exports.getByUser = function(req, res) {
  Review.findByUser(query, params, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/item/:item_id
exports.getByItem = function(req, res) {
  Review.findByItem(req.params.item_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/:id
exports.show = function(req, res) {
  Review.find(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// POST http://localhost:9000/api/reviews
exports.create = function(req, res) {
  Review.create(req.body.item_id, req.body.review, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// PUT http://localhost:9000/api/reviews/:id
exports.update = function(req, res) {
  Review.update(req.params.id, req.body.review, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

exports.destroy = function(req, res) {
  Review.destroy(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

var handleError = function(res, err) {
  return res.send(500, err);
};
