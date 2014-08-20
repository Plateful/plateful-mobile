'use strict';

var _ = require('lodash');
var MenuClient = require('../config/api/locu').MenuClient;
var Item = require('../models/Item.model');
var apiKey, outputFormat


// TODO: Google api information. Joel will remove this soon
exports.apiKey = apiKey = "AIzaSyCB0Ac877CMP3MyZ9gtw4z8Ht4i7yjGx0w";
exports.outputFormat = outputFormat = "json";

exports.index = function(req, res) {
  Item.all(function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    // console.log(data);
    // console.log("Hello");
    res.json(data);
  });
};

// GET http://localhost:9000/api/items/business/:menu_id
// working (must change the connection from :HAS_ITEM to :HAS)
exports.getByMenu = function(req, res) {
  Item.findByMenu(req.params.menu_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(data);
  });
};

// GET http://localhost:9000/api/items/user/:user_id
// working
exports.getByUser = function(req, res) {
  Item.findByUser(req.params.user_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/items/location
exports.getByLocation = function(req, res) {
  console.log('yollyo')
  console.log(req.params.filter)

  Item.findByLocation(req.params.filter, function(err, result) {
    if (err) {
      console.log(err)
      return handleError(res, err);
    }
    res.status(200)
    res.json(result.data);
  });
};

// GET single item http://localhost:9000/api/items/:id
// working
exports.show = function(req, res) {
  Item.find(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200)
    res.json(data);
  });
};

exports.getItemPhotos = function(req, res){
  Item.getItemPhotos(req.params.id, function(err, result){
    if(err) return handleError(res, err)
    res.status(200)
    res.json(result)
  })

}
exports.getItemReviews = function(req, res){
  Item.getItemPhotos(req.params.id, function(err, result){
    if(err) return handleError(res, err)
    res.status(200)
    res.json(result)
  })
}

// POST http://localhost:9000/api/items/
// Working but need to make changes to the neo4j queries takes in data
exports.create = function(req, res) {
  Item.create(req.body.menu_id, req.body.item, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// PUT http://localhost:9000/api/items/:id
// working but need changes to only added the changes to one property instead of over writing the whole thing
exports.update = function(req, res) {
  Item.update(req.params.id, req.body, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// DELETE http://localhost:9000/api/items/:id
exports.destroy = function(req, res) {
  Item.destroy(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

var handleError = function(res, err) {
  return res.send(500, err);
};
