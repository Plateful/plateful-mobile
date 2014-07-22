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
var getByBusinessQuery = "START n=node({menu_id}) MATCH (n)-->(i)-->(r:Review) RETURN n"
exports.getByBusiness = function(req, res) {
  var business_id = req.params.business_id;
  Review.find({business_id: business_id}, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};
var getByUserQuery = "START n=node({user_id}) MATCH (n)-->(r:Review) return r"
exports.getByUser = function(req, res) {
  var user_id = req.params.user_id
  Review.find({user_id: user_id}, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

var getByItemQuery = "START n=node({item_id}) MATCH (n)-->(r:Review) return r"
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
var showQuery = "START n=node({review_id}) MATCH (n)-->(children) RETURN r,children"
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
// exports.create = function(req, res) {
  // var fstream;
  // req.pipe(req.busboy);
  // req.busboy.on('file', function (fieldname, file, filename) {
  //   console.log("Uploading: " + filename, fieldname, file);
  //   fstream = fs.createWriteStream(__dirname + '/files/' + filename);
  //   file.pipe(fstream);
  //
  //   fstream.on('close', function () {
  //     res.json(200, req.body);
  //   });
  // });



// };


exports.getWith = function(req, res){
  // var query = relations[req.params.relationship]
}

var createQuery = "START d=node({dish_id}), u=node({user_id}) MATCH (n), (u),"+
                  "CREATE (r:Review {review}),"+
                          "(p:Photo {photo}),"+
                          "(e:Essay {essay}),"+
                          "(s:Star {star}),"+
                          "(r)-[:PHOTO]->(p),"+
                          "(r)-[:ESSAY]->(e),"+
                          "(r)-[:STAR]->(s),"+
                          "(d)-[:HAS_REVIEW]->(r),"+
                          "RETURN r"
exports.create = function(req, res) {
  res.json(201, 'Review was created', req.body)
};

var updateQuery = "START r=node({review_id}) MATCH (r) SET r = {review} RETURN r"
// Updates an existing item in the DB.
exports.update = function(req, res) {
  res.json(201, 'Review with ID of '+req.body.id+' was Updated', req.body)
};

var destroyQuery = "START r=node({review_id}) MATCH (r) DELETE r"
// Deletes a item from the DB.
exports.destroy = function(req, res) {
  res.json(201, 'Review with ID of '+req.body.id+' was Deleted')
};
// Updates an existing review in the DB.


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


//
//
// START item=node(1702)
//
// MATCH (user:User)-[:ALBUM]->(album) WHERE id(user) = 1703,
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
