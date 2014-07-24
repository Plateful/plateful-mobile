'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var db = require('../../config/neo4j').db
var Review = require('../review/review.model')
var Business = require('../business/business.model')

//working
//GET http://localhost:9000/api/items
exports.index = function(req, res) {
  db.cypherQuery('MATCH (i:Item) RETURN i LIMIT 25', function(err, result){
    if (err) return handleError(res, err);
    res.json(201, result.data);
  });
}

//working
//GET http://localhost:9000/api/items/business/30
exports.getByBusiness = function(req, res) {
  var params = {menu: Number(req.params.business_id)};
  var query = "START menu=node({menu}) "+
              "MATCH (menu)-[:HAS_ITEM]->(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo) " +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "RETURN item, review, body, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);
  });
};

//working
//GET http://localhost:9000/api/items/user/28
exports.getByUser = function(req, res) {
  var params = {user: Number(req.params.user_id)};
  var query = "START user=node({user})" +
              'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)' +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "RETURN item, review, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);
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


//working
//GET single item http://localhost:9000/api/items/35
exports.show = function(req, res) {
  var params = {id: Number(req.params.id)};
  var query = "START item=node({id})" +
              "MATCH (item)-[:REVIEW]->(review:Review)-[:BODY]->(body:Body)" +
              "MATCH (review)-[:PHOTO]->(photo:Photo)" +
              "RETURN item, review, photo, body";
  db.cypherQuery(query, params, function(err, result){
    if(err) return handleError(res, err)
    res.json(200, result.data)
  })
};

//POST http://localhost:9000/api/items/
//Working but needs to add changes to that its takes in data from request.
exports.create = function(req, res) {
  var query = "START menu=node(7)" +
              "CREATE (menu)-[:HAS_ITEM]->(item: Item { name: 'Rice cake', description: 'Rice Cake with Chicken Stock'})" +
              "RETURN item"
  db.cypherQuery(query, function(err, result){
    if(err) return handleError(res, err)
    res.json(200, result.data)
  })
};

//PUT http://localhost:9000/api/items/11
exports.update = function(req, res) {
  var params = {changes:req.body};
  var query = "START item=node("+ req.params.id + ") SET item = {changes} RETURN item"
  db.cypherQuery(query, params, function(err, result){
    res.json(201, 'Item with ID of '+ req.body.id +' was Updated', result.data)
  })
};

exports.destroy = function(req, res) {
  var destroyQuery = "START d=node({item_id}) MATCH (d) DELETE d"
  res.json(201, 'Item with ID of '+req.body.id+' was Deleted')
};

function handleError(res, err) {
  return res.send(500, err);
}


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
