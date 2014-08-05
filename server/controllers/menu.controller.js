(function() {
  'use strict';
  var Menu, Venue, base64_encode, db, factual, handleError, http, storeData, yelp, _;

  _ = require('lodash');

  http = require('http');

  db = require('../config/neo4j').db;

  Venue = require('../config/api/locu').VenueClient;

  factual = require('../config/api/factual').factual;

  yelp = require('../config/api/yelp').yelp;

  storeData = require('./storeData');

  Menu = require('../models/Menu.model');

  exports.index = function(req, res) {
    return Menu.all(function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
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
    return Menu.find(function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      if (!data.length) {
        return Venue.get_details(req.params.id, function(response) {
          return storeData.store(response.objects[0], function(data) {
            return res.json(200, data);
          });
        });
      } else {
        return res.json(200, data[0]);
      }
    });
  };

  exports.create = function(req, res) {
    return Menu.create(req.body.menu, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.update = function(req, res) {
    return Menu.update(req.params.id, req.body, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.destroy = function(req, res) {
    return Menu.destroy(req.params.id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  handleError = function(res, err) {
    return res.send(500, err);
  };

  base64_encode = function(bitmap) {
    return new Buffer(bitmap).toString('base64');
  };

}).call(this);
