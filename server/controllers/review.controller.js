'use strict';

var _ = require('lodash');
// var busboy = require('connect-busboy');
var fs = require('fs');
var Busboy = require('busboy');
// NEO4J API
var db = require('../config/neo4j').db;

// FACTUAL API
var factual = require('../config/api/factual').factual;

// YELP API
var yelp = require('../config/api/yelp').yelp;

// Review Model
var Review = require('../models/Review.model');

exports.index = function(req, res) {
  Review.all(function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/business/:menu_id
// working
exports.getByMenu = function(req, res) {
  Review.findByMenu(req.params.menu_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/user/:user_id
exports.getByUser = function(req, res) {
  Review.findByUser(query, params, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/item/:item_id
exports.getByItem = function(req, res) {
  Review.findByItem(req.params.item_id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// GET http://localhost:9000/api/reviews/:id
exports.show = function(req, res) {
  Review.find(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

// POST http://localhost:9000/api/reviews
exports.create = function(req, res) {
  // console.log(req.files)
  // Review.create(req.body.item_id, req.body.review, function(err, data) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
  //   res.json(201, data);
  // });
  var busboy = new Busboy({headers: req.headers});

    // Initiate form processing
    req.pipe(busboy);
    // When file is found, start working with it
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      // Pipe the file stream right into an Azure blob
      // This allows us to avoid storing the file temporarily on the server
      // file.pipe(blobService.createBlob('vds1', videoId + '.webm', azure.Constants.BlobConstants.BlobTypes.BLOCK));
      console.log(file)
      console.log(filename)
      file.on('end', function(data) {
        //add data to the storage object above
        console.log('File  Finished');
      });

    });

    busboy.on('finish', function() {
      console.log('Done parsing form');
    });
  res.json("hello")
};

// PUT http://localhost:9000/api/reviews/:id
exports.update = function(req, res) {
  Review.update(req.params.id, req.body.review, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

exports.destroy = function(req, res) {
  Review.destroy(req.params.id, function(err, data) {
    if (err) {
      return handleError(res, err);
    }
    res.json(201, data);
  });
};

var handleError = function(res, err) {
  return res.send(500, err);
};
