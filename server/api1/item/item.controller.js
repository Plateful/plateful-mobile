'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var db = require('../../config/neo4j').db
// var Business = require('')
var Review = require('../review/review.model')
var Business = require('../business/business.model')

exports.index = function(req, res) {
  db.cypherQuery('MATCH (i:Item) return i LIMIT 25', function(err, result){
    if (err) return handleError(res, err)
    res.json(201, result.data)
  })
}
exports.getByBusiness = function(req, res) {
  var business_id = req.params.business_id;
  var params = {business:req.params.business_id}
  var query = "START b=node({business})"+
              "MATCH (b)-[:]->(d:Dish), (b)"
  Item.find({business: business_id}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};
exports.getByUser = function(req, res) {
  var user_id = req.params.user_id;
  Item.find({user_id: user_id}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};
exports.getByLocation = function(req, res) {
  // yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
  // var user_id = req.params.user_id;
  var location = req.body.location
  Item.find(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single item
exports.show = function(req, res) {
  console.log(req.params.id);
  db.cypherQuery('MATCH (n) WHERE id(n) = '+req.params.id+' RETURN n',
  function(err, result){
    if(err) return handleError(res, err)
      console.log("item", result.data);
    res.json(200, result.data)
  })
  // Item.findById(req.params.id, function (err, item) {
  //   if(err) { return handleError(res, err); }
  //   if(!item) { return res.send(404); }
  //     Review.find({item_id: req.params.id}, function(err, reviews){
  //       if(err) { return handleError(res, err); }
  //       if(reviews.length){
  //         item.reviews = reviews
  //       }
  //       return res.json(item);
  //     })
  // });
};

// Creates a new item in the DB.
var createQuery = "START m=node({menu_id}),"+
                  "MATCH (m),"+
                  "CREATE (d:Dish {dish}),"+
                   "(r:Review {review}),"+
                   "(p:Photo {photo}),"+
                   "(e:Essay {essay}),"+
                   "(star:Star {star}),"+
                   "(d)-[:HAS_REVIEW]->(r),"+
                   "(d)-[:HAS_PHOTO]->(p),"+
                   "(d)-[:HAS_ESSAY]->(e),"+
                   "(d)-[:HAS_STAR]->(star),"+
                   "(r)-[:PHOTO]->(p),"+
                   "(r)-[:ESSAY]->(e),"+
                   "(r)-[:STAR]->(star),"+
                   "(m)-[:HAS_DISH]->(d)"
exports.create = function(req, res) {
  res.json(201, 'Item was created', req.body)
};
var updateQuery = "START d=node({item_id}) SET d = {params} RETURN d"
// Updates an existing item in the DB.
exports.update = function(req, res) {
  res.json(201, 'Item with ID of '+req.body.id+' was Updated', req.body)
};

var destroyQuery = "START d=node({item_id}) MATCH (d) DELETE d"
// Deletes a item from the DB.
exports.destroy = function(req, res) {
  res.json(201, 'Item with ID of '+req.body.id+' was Deleted')
};

function handleError(res, err) {
  return res.send(500, err);
}

//
// items.foreach(function(item){
//   Item.create(item, function(err, newItem) {
//
//     console.log(newItem)
//
//   });
// })
