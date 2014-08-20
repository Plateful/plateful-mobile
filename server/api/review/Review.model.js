var db = require('../config/neo4j').db;

var Review = function() {
  this.query = db.cypherQuery;
};

Review.prototype.all = function(callback) {
  var q = "MATCH (i:Menu) RETURN i";
  this.query(q, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.find = function(review_id, callback) {
  var params = {
    review_id: Number(review_id)
  };
  var q = "START review=node({review_id})" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN review, photo, body";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.findByMenu = function(menu_id, callback) {
  var params = {
    menu_id: Number(menu_id)
  };
  var q = "START menu=node({menu_id}) " + "MATCH (menu)-[:HAS_ITEM]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.findByUser = function(user_id, callback) {
  var params = {
    user_id: Number(user_id)
  };
  var q = "START user=node({user_id})" + 'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, photo";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.findByItem = function(item_id, callback) {
  var params = {
    item_id: Number(item_id)
  };
  var q = "START item=node({item_id})" + "MATCH (item)-[:REVIEW]->(review:Review)" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN item, review, photo, body";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.create = function(item_id, review, callback) {
  var params = {
    item_id: Number(item_id),
    review: review
  };
  var q = "START item=node({item_id})" + "CREATE (item)-[:REVIEW]->(review:Review {review})" + "CREATE (photo:Photo)<-[:PHOTO]-(review)-[:BODY]->(body:Body {text: 'I love this dish'})";
  "RETURN review, photo, body";
  this.query(q, params(function(err, result) {
    callback(err, data);
  }));
};

Review.prototype.update = function(review_id, review, callback) {
  var params = {
    review_id: review_id,
    changes: review
  };
  var q = "";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Review.prototype.destroy = function(review_id, callback) {
  var params = {
    review_id: Number(review_id)
  };
  var q = "START review=node({review_id}) MATCH (review)-[r]-() DELETE review, r";
  this.query(q, params, function(err, result) {
    callback(err, data);
  });
};

module.exports = new Review();
