(function() {
  'use strict';
  var Review, busboy, db, factual, fs, handleError, yelp, _;

  _ = require('lodash');

  busboy = require('connect-busboy');

  fs = require('fs');

  db = require('../config/neo4j').db;

  factual = require('../config/api/factual').factual;

  yelp = require('../config/api/yelp').yelp;

  Review = require('../models/Review.model');

  exports.index = function(req, res) {
    return Review.all(function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.getByMenu = function(req, res) {
    return Review.findByMenu(req.params.menu_id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.getByUser = function(req, res) {
    return Review.findByUser(query, params, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.getByItem = function(req, res) {
    return Review.findByItem(req.params.item_id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.show = function(req, res) {
    return Review.find(req.params.id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.create = function(req, res) {
    return Review.create(req.body.item_id, req.body.review, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.update = function(req, res) {
    return Review.update(req.params.id, req.body.review, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.destroy = function(req, res) {
    return Review.destroy(req.params.id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  handleError = function(res, err) {
    return res.send(500, err);
  };

}).call(this);
