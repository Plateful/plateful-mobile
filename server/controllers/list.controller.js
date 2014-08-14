'use strict';

var db = require('../config/neo4j').db;
var List = require('../models/List.model');

exports.show = function(req, res) {
  List.show(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({itemArray: data});
  })
}

// Use this to handle errors
var handleError = function(res, err) {
  return res.status(500).send(err);
};
