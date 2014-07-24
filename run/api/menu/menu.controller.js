(function() {
  'use strict';
  var base64_encode, db, factual, handleError, http, yelp, _;

  _ = require('lodash');

  http = require('http');

  db = require('../../config/neo4j').db;

  factual = require('../../config/factual').factual;

  yelp = require('../../config/yelp').yelp;

  exports.index = function(req, res) {
    return db.cypherQuery("MATCH (menu:Menu) RETURN menu", function(err, result) {
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
        return handleError(res, err);
      }
      return res.json(200, result.data);
    });
  };

  exports.show = function(req, res) {
    var params, query;
    params = {
      id: Number(req.params.id)
    };
    query = "START menu=node({id})" + "MATCH (menu)-[:HAS]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, result.data);
    });
  };

  exports.create = function(req, res) {
    var menu, params, query;
    query = "CREATE (menu:Menu {menu}) RETURN menu";
    menu = {
      factual_id: "0bf93772-75c7-4710-889d-9f407d612706",
      name: "Thai Gourmet Group",
      address: "845 Market Street",
      locality: "San Francisco",
      region: "CA",
      postcode: 94103,
      country: 'US',
      tel: '(415)-538-0800',
      latitude: 37.784268,
      longitude: -122.406917,
      website: 'http://www.leftyodouls.biz'
    };
    params = {
      menu: menu
    };
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
