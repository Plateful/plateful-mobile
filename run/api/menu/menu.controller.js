(function() {
  'use strict';
  var base64_encode, db, factual, handleError, http, yelp, _;

  _ = require('lodash');

  http = require('http');

  db = require('../../config/neo4j').db;

  factual = require('../../config/factual').factual;

  yelp = require('../../config/yelp').yelp;

  exports.index = function(req, res) {
    var params, query;
    query = "";
    params = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  base64_encode = function(bitmap) {
    return new Buffer(bitmap).toString('base64');
  };

  exports.getByLocation = function(req, res) {
    return factual.get('/t/places/', {
      q: req.body.val,
      geo: {
        "$circle": {
          "$center": [req.body.lat, req.body.lng],
          "$meters": 5000
        }
      }
    }, function(err, result) {
      if (err) {
        return handleError(req, err);
      }
      return res.json(200, result.data);
    });
  };

  exports.show = function(req, res) {
    var params, query;
    params = {};
    query = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(req, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.create = function(req, res) {
    var params, query;
    params = {};
    query = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(req, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.update = function(req, res) {
    var params, query;
    params = {};
    query = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(req, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.destroy = function(req, res) {
    var params, query;
    params = {};
    query = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(req, err);
      }
      return res.json(201, result.data);
    });
  };

  handleError = function(res, err) {
    return res.send(500, err);
  };

}).call(this);
