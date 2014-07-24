(function() {
  'use strict';
  var db, handleError, _;

  _ = require('lodash');

  db = require('../../config/neo4j').db;

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
    var business_id, params, query;
    business_id = req.params.business_id;
    params = {
      business: req.params.business_id
    };
    query = "START b=node({business}) MATCH (b)-[:]->(d:Dish), (b)";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.getByUser = function(req, res) {
    var params, query, user_id;
    user_id = req.params.user_id;
    query = "";
    params = "";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.getByLocation = function(req, res) {
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
    console.log(req.params.id);
    return db.cypherQuery('MATCH (n) WHERE id(n) = ' + req.params.id + ' RETURN n', function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, result.data);
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
