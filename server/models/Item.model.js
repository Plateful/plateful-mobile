var db = require('../config/neo4j').db;

var Item = function() {
  this.query = db.cypherQuery;
};

Item.prototype.all = function(callback) {

  db.cypherQuery('MATCH (m:ITEM)-->()-->(p) RETURN m,p LIMIT 25', function(err, result){
    callback(err, result.data)
    // console.log(result);
    // res.json(201, result.data);
  })
};

Item.prototype.find = function(item_id, callback) {
  var params = {
    id: Number(item_id)
  };
  var query = "START item=node({id})" + "MATCH (item)-[:REVIEW]->(review:Review)-[:BODY]->(body:Body), " + "(review)-[:PHOTO]->(photo:Photo)" + "RETURN item, review, photo, body";
  this.query('MATCH (n) WHERE id(n) = {id} RETURN n', function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.findByMenu = function(menu_id, callback) {
  var params = {
    menu: Number(menu_id)
  };
  var query = "START menu=node({menu}) " + "MATCH (menu)-[:HAS_ITEM]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.findByUser = function(user_id, callback) {
  var params = {
    user: Number(user_id)
  };
  var query = "START user=node({user})" + 'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, photo";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.findByLocation = function(data, callback) {
  // The code below is a snippet for the eventual query to neo.
  var params = "";
  var query = "";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.findWhere = function() {};

Item.prototype.findWith = function() {};

Item.prototype.create = function(menu_id, item, callback) {
  var params = {
    menu_id: menu_id,
    item: item
  };
  var query = "START menu=node({menu_id})" + "CREATE (item:Item {item})";
  "(menu)-[:HAS_ITEM]->(item)" + "RETURN item";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.update = function(item_id, item, callback) {
  var params = {
    changes: item,
    id: item_id
  };
  var query = "START item=node({id}) SET item = {changes} RETURN item";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.destroy = function(item_id, callback) {
  var params = {
    id: Number(item_id)
  };
  var query = "START item=node({id}) MATCH (item)-[r]-() DELETE item, r";
  this.query(query, params, function(err, result) {
    callback(err, result.data);
  });
};

module.exports = new Item();
