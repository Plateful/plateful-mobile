'use strict';

var _ = require('lodash');
var Review = require('./review.model');
var busboy = require('connect-busboy');
var fs = require('fs');
var db = require('../../config/neo4j').db
// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};
exports.getByBusiness = function(req, res) {
  var business_id = req.params.business_id;
  Review.find({business_id: business_id}, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};
exports.getByUser = function(req, res) {
  var user_id = req.params.user_id
  Review.find({user_id: user_id}, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};
exports.getByItem = function(req, res) {
  db.cypherQuery('MATCH (n) WHERE id(n) = '+req.params.item_id+' MATCH (r:Review)-[:REVIEW_OF]->(n) MATCH (r)-[*]->(p) RETURN p',
  function(err, result){
    if(err) return handleError(res, err)
      console.log("item", result.data);
    res.json(200, result.data)
  })
  // var item_id = req.params.item_id
  // Review.find({item_id: item_id}, function (err, reviews) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, reviews);
  // });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename, fieldname, file);
    fstream = fs.createWriteStream(__dirname + '/files/' + filename);
    file.pipe(fstream);

    fstream.on('close', function () {
      res.json(200, req.body);
    });
  });
  // console.log('req================================', req);
  // console.log('body=================================', req.body);
  // console.log('files=================================', req.files);
  // return res.json(req.body)
  // Review.create(req.body, function(err, review) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, review);
  // });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
