(function() {
  'use strict';
  var Item, MenuClient, apiKey, handleError, outputFormat, _;

  _ = require('lodash');

  MenuClient = require('../config/api/locu').MenuClient;

  Item = require('../models/Item.model');

  exports.apiKey = apiKey = "AIzaSyCB0Ac877CMP3MyZ9gtw4z8Ht4i7yjGx0w";

  exports.outputFormat = outputFormat = "json";

  exports.index = function(req, res) {
    return Item.all(function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.getByMenu = function(req, res) {
    return Item.findByMenu(req.params.menu_id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data);
    });
  };

  exports.getByUser = function(req, res) {
    return Item.findByUser(req.params.user_id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.getByLocation = function(req, res) {
    var data;
    console.log('yolo');
    data = {
      location: [req.body.lat, req.body.lng]
    };
    if (req.body.val) {
      data.name = req.body.val;
    }
    return MenuClient.search(data, function(response) {
      console.log(response.objects);
      return res.json(200, response.objects);
    });
  };

  exports.show = function(req, res) {
    return Item.find(req.params.id, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data);
    });
  };

  exports.create = function(req, res) {
    return Item.create(req.body.menu_id, req.body.item, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.update = function(req, res) {
    return Item.update(req.params.id, req.body, function(err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, data);
    });
  };

  exports.destroy = function(req, res) {
    return Item.destroy(req.params.id, function(err, data) {
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
