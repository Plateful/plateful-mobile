(function() {
  'use strict';
  var Venue, base64_encode, db, factual, handleError, http, storeData, yelp, _;

  _ = require('lodash');

  http = require('http');

  db = require('../../config/neo4j').db;

  Venue = require('../../config/api/locu').VenueClient;

  factual = require('../../config/api/factual').factual;

  yelp = require('../../config/api/yelp').yelp;

  storeData = require('./storeData');

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
    var data;
    data = {
      location: [req.body.lat, req.body.lng],
      radius: 500
    };
    if (req.body.val) {
      data.name = req.body.val;
    }
    console.log("Fuck Yelp", data);
    return Venue.search(data, function(response) {
      console.log(response);
      return res.json(200, response.objects);
    });
  };

  exports.show = function(req, res) {
    var params, query;
    params = {
      id: req.params.id
    };
    query = "Match (m:Menu) WHERE m.locu_id = {id} RETURN m";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("yes", result.data);
      if (!result.data.length) {
        return Venue.get_details(req.params.id, function(response) {
          return storeData.store(response.objects[0], function(data) {
            return res.json(200, data);
          });
        });
      } else {
        return res.json(200, result.data[0]);
      }
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
