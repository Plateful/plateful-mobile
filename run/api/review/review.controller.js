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
    var query;
    query = "MATCH (i:Menu) RETURN i";
    return db.cypherQuery(query, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.getByBusiness = function(req, res) {
    var params, query;
    params = {
      menu: Number(req.params.business_id)
    };
    query = "START menu=node({menu}) " + "MATCH (menu)-[:HAS_ITEM]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.getByUser = function(req, res) {
    var params, query;
    params = {
      user: Number(req.params.user_id)
    };
    query = "START user=node({user})" + 'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, photo";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.getByItem = function(req, res) {
    var params, query;
    params = {
      id: Number(req.params.item_id)
    };
    query = "START item=node({id})" + "MATCH (item)-[:REVIEW]->(review:Review)" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN item, review, photo, body";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.j(son(201, result.data));
    });
  };

  exports.show = function(req, res) {
    var params, query;
    params = {
      review_id: Number(req.params.id)
    };
    query = "START review=node({review_id})" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN review, photo, body";
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
