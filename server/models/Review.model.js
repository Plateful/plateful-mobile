(function() {
  var Review, db;

  db = require('../config/neo4j').db;

  Review = function() {
    return this.query = db.cypherQuery;
  };

  Review.prototype.all = function(callback) {
    var q;
    q = "MATCH (i:Menu) RETURN i";
    return this.query(q, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.find = function(review_id, callback) {
    var params, q;
    params = {
      review_id: Number(review_id)
    };
    q = "START review=node({review_id})" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN review, photo, body";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.findByMenu = function(menu_id, callback) {
    var params, q;
    params = {
      menu_id: Number(menu_id)
    };
    q = "START menu=node({menu_id}) " + "MATCH (menu)-[:HAS_ITEM]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.findByUser = function(user_id, callback) {
    var params, q;
    params = {
      user_id: Number(user_id)
    };
    q = "START user=node({user_id})" + 'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, photo";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.findByItem = function(item_id, callback) {
    var params, q;
    params = {
      item_id: Number(item_id)
    };
    q = "START item=node({item_id})" + "MATCH (item)-[:REVIEW]->(review:Review)" + "MATCH (body:Body)<-[:BODY]-(review)-[:PHOTO]->(photo:Photo)" + "RETURN item, review, photo, body";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.create = function(item_id, review, callback) {
    var params, q;
    params = {
      item_id: Number(item_id),
      review: review
    };
    q = "START item=node({item_id})" + "CREATE (item)-[:REVIEW]->(review:Review {review})" + "CREATE (photo:Photo)<-[:PHOTO]-(review)-[:BODY]->(body:Body {text: 'I love this dish'})";
    "RETURN review, photo, body";
    return this.query(q, params(function(err, result) {
      return callback(err, data);
    }));
  };

  Review.prototype.update = function(review_id, review, callback) {
    var params, q;
    q = "";
    params = {
      review_id: review_id,
      changes: review
    };
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Review.prototype.destroy = function(review_id, callback) {
    var params, q;
    params = {
      review_id: Number(review_id)
    };
    q = "START review=node({review_id}) MATCH (review)-[r]-() DELETE review, r";
    return this.query(q, params, function(err, result) {
      return callback(err, data);
    });
  };

}).call(this);
