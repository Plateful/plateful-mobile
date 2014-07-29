'use strict';
//need to work on update


var _ = require('lodash');
var Review = require('./review.model');
var busboy = require('connect-busboy');
var fs = require('fs');
var db = require('../../config/neo4j').db

// working
// GET all reviews http://localhost:9000/api/reviews
exports.index = function(req, res) {
  var query = "MATCH (review:Review) " +
              "MATCH (review)-[:BODY]->(body:Body) " +
              "MATCH (review)-[:PHOTO]->(photo:Photo) " +
              "RETURN review, photo, body"
  db.cypherQuery(query, function(err, result){
    if (err) return console.log(err);
      //handleError(res, err);
    res.json(201, result.data);
  })

};

//GET http://localhost:9000/api/reviews/business/7
exports.getByBusiness = function(req, res) {
  var params = {menu: Number(req.params.business_id)};
  var query = "START menu=node({menu}) "+
              "MATCH (menu)-[:HAS_ITEM]->(item:Item) "+
              "MATCH (item)-[:REVIEW]->(review:Review)" +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "MATCH (review)-[:PHOTO]->(photo:Photo)" +
              "RETURN item, review, body, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);
  });
};


//GET http://localhost:9000/api/reviews/userId
exports.getByUser = function(req, res) {
  var params = {user: Number(req.params.user_id)};
  var query = "START user=node({user})" +
              "MATCH (user)-[:WROTE]->(review:Review)" +
              "MATCH (review)-[:PHOTO]->(photo:Photo)" +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "RETURN review, body, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);
  });
};

exports.getByItem = function(req, res) {
  var params = {item: Number(req.params.item_id)};
  var query = "START item=node({item})" +
              "MATCH (item)-[:REVIEW]->(review:Review)" +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "MATCH (review)-[:PHOTO]->(photo:Photo)" +
              "RETURN review, body, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);res.json(200, result.data)
  })

};

// Get a single review
exports.show = function(req, res) {
  var params = {review: Number(req.params.review_id)};
  var query = "START review=node({review})" +
              "MATCH (review)-[:BODY]->(body:Body)" +
              "MATCH (review)-[:PHOTO]->(photo:Photo)" +
              "RETURN review, body, photo"
  db.cypherQuery(query, params, function(err, result){
    if (err) return console.log(err)
    res.json(201, result.data);res.json(200, result.data)
  });
};


//for create we need to pass in an item_id
//did not add body and photo yet in this review
exports.create = function(req, res) {
  var params = {item_id: Number(req.params.item_id)};
  var query = "START item=node({item_id})" +
              "CREATE (review: Review {star: 5})" +
              "CREATE (item)-[:REVIEW]->(review)"
              "RETURN review"
  db.cypherQuery(query, function(err, result){
    if(err) return handleError(res, err)
    res.json(200, result.data)
  })
};

exports.update = function(req, res) {
  res.json(201, 'Review with ID of '+req.body.id+' was Updated', req.body)
};

exports.destroy = function(req, res) {
  res.json(201, 'Review with ID of '+req.body.id+' was Deleted')
};

exports.getWith = function(req, res){
  // var query = relations[req.params.relationship]
}

function handleError(res, err) {
  return res.send(500, err);
}





// QUERY #1
// START d=node(1115) MATCH (d), (u:User) WHERE id(u) = 1520
// CREATE (r:Review {created_at: timestamp()}), (p:Photo {likes: 150}), (e:Essay {text: "Yolo about this"}),
// (s:Star {value: 5}),
// (d)-[:REVIEW]->(r)-[:ESSAY]->(e)<-[:AUTHORED]-(u),
// (r)-[:STAR]->(s)<-[:RATE]-(u),
// (r)-[:PHOTO]->(p)<-[:SNAP]-(u)
// return d,u,r,e,p

//
// QUERY #2
// START d=node(1115)
// MATCH (d), (u:User) WHERE id(u) = 1520
// CREATE (r:Review {created_at: timestamp()}),
// (p:Photo {likes: 150}),
// (e:Essay {text: "Yolo about this"}),
// (s:Star {value: 5}),
// (d)-[:REVIEW]->(r)<-[:BY]-(u),
// (r)-[:ESSAY]->(e)<-[:AUTHORED]-(u),
// (r)-[:STAR]->(s)<-[:RATE]-(u),
// (r)-[:PHOTO]->(p)<-[:SNAP]-(u)
// return d,u,r,e,p

// QUERY #3
// START d=node(1115)
// MATCH (d), (u:User) WHERE id(u) = 1520
// CREATE (r:Review {created_at: timestamp()}),
// (p:Photo {likes: 150}),
// (e:Essay {text: "Yolo about this"}),
// (s:Star {value: 5}),
// (d)-[:REVIEW]->(r)<-[:BY]-(u),
// (d)-[:HAS_ESSAY]->(e)<-[:AUTHORED]-(u),
// (d)-[:HAS_STAR]->(s)<-[:RATE]-(u),
// (d)-[:HAS_PHOTO]->(p)<-[:SNAP]-(u),
// (r)-[:ESSAY]->(e),
// (r)-[:STAR]->(s),
// (r)-[:PHOTO]->(p)
// return d,u,r,e,p

// QUERY #4
// START d=node(1115)
// MATCH (d), (u:User) WHERE id(u) = 1520
// CREATE (r:Review {created_at: timestamp()}),
// (p:Photo {likes: 150}),
// (e:Essay {text: "Yolo about this"}),
// (s:Star {value: 5}),
// (d)-[:REVIEW]->(r)<-[:BY]-(u),
// (r)-[:ESSAY]->(e),
// (r)-[:STAR]->(s),
// (r)-[:PHOTO]->(p)
// return d,u,r,e,p


// QUERY #5
// START d=node(1115)
// MATCH (d), (u:User) WHERE id(u) = 1520
// CREATE (r:Review {created_at: timestamp()}),
// (p:Photo {likes: 150}),
// (e:Essay {text: "Yolo about this"}),
// (s:Star {value: 5}),
// (d)-[:REVIEW]->(r)<-[:BY]-(u),
// (r)-[:ESSAY]->(e),
// (r)-[:STAR]->(s),
// (r)-[:PHOTO]->(p)
// return d,u,r,e,p


// QUERY #6

// ITEM MUST HAVE A [:GALLERY] relation to a (:Gallery) labeled node


// RUN 1 TIME
// CREATE
//   (user:User)-[:ALBUM]-(album)
//   (item:Item)-[:GALLERY]-(gallery)
// RETURN user,album,item,gallery
//
// RUN 5 TIMES
//
// START item=node(ITEMS ID GOES HERE)
//
// MATCH (user:User)-[:ALBUM]->(album) WHERE id(user) = USERSID GOES HERE,
//       (item)-[:GALLERY]->(gallery)
//
// CREATE (review:Review {created_at: timestamp()}),
//        (photo:Photo {likes: 150}),
//        (body:Body {text: "Yolo about this"}),
//        (star:Star {value: 5}),
//
//        (item)-[:REVIEW]->(review)<-[:WROTE]-(user),
//        (gallery)-[:PHOTO]->(photo)<-[:PHOTO]-(album),
//        (review)-[:BODY]->(body),
//        (review)-[:STAR]->(star),
//        (review)-[:PHOTO]->(photo)
// return item,user,review,photo,body,star
//
//
//
//
//
//
//
//
//
//
