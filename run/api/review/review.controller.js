(function() {
  'use strict';
  var busboy, db, factual, fs, handleError, yelp, _;

  _ = require('lodash');

  busboy = require('connect-busboy');

  fs = require('fs');

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

  exports.getByBusiness = function(req, res) {
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

  exports.getByUser = function(req, res) {
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

  exports.getByItem = function(req, res) {
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

  exports.show = function(req, res) {
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

  exports.create = function(req, res) {
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

  exports.update = function(req, res) {
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

  exports.destroy = function(req, res) {
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

  handleError = function(res, err) {
    return res.send(500, err);
  };

}).call(this);
