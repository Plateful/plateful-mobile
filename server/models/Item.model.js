(function() {
  var Item, db;

  db = require('../config/neo4j').db;

  Item = function() {
    return this.query = db.cypherQuery;
  };

  Item.prototype.all = function(callback) {
    var query;
    query = "MATCH (m:Item) RETURN m";
    return this.query(query, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.find = function(item_id, callback) {
    var params, query;
    params = {
      id: Number(item_id)
    };
    query = "START item=node({id})" + "MATCH (item)-[:REVIEW]->(review:Review)-[:BODY]->(body:Body), " + "(review)-[:PHOTO]->(photo:Photo)" + "RETURN item, review, photo, body";
    return this.query('MATCH (n) WHERE id(n) = {id} RETURN n', function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.findByMenu = function(menu_id, callback) {
    var params, query;
    params = {
      menu: Number(menu_id)
    };
    query = "START menu=node({menu}) " + "MATCH (menu)-[:HAS_ITEM]->(item:Item)," + "(item)-[:REVIEW]->(review:Review)," + "(item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo)," + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, body, photo";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.findByUser = function(user_id, callback) {
    var params, query;
    params = {
      user: Number(user_id)
    };
    query = "START user=node({user})" + 'MATCH (user)-[:WROTE]->(review:Review)<-[:REVIEW]-(item:Item)-[:GALLERY]->(gallery:Gallery)-[:PHOTO]->(photo:Photo),' + "(review)-[:BODY]->(body:Body)" + "RETURN item, review, photo";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.findByLocation = function(data, callback) {
    var params, query;
    params = "";
    query = "";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.findWhere = function() {};

  Item.prototype.findWith = function() {};

  Item.prototype.create = function(menu_id, item, callback) {
    var params, query;
    params = {
      menu_id: menu_id,
      item: item
    };
    query = "START menu=node({menu_id})" + "CREATE (item:Item {item})";
    "(menu)-[:HAS_ITEM]->(item)" + "RETURN item";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.update = function(item_id, item, callback) {
    var params, query;
    params = {
      changes: item,
      id: item_id
    };
    query = "START item=node({id}) SET item = {changes} RETURN item";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Item.prototype.destroy = function(item_id, callback) {
    var params, query;
    params = {
      id: Number(item_id)
    };
    query = "START item=node({id}) MATCH (item)-[r]-() DELETE item, r";
    return this.query(query, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  module.exports = new Item();

}).call(this);
