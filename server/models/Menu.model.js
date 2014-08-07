var db = require('../config/neo4j').db;

var Menu = function() {
  this.query = db.cypherQuery;
};

Menu.prototype.all = function(callback) {
  var q = "MATCH (menu:Menu) RETURN menu";
  this.query(q, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.find = function(menu_id, callback) {
  var params = {
    menu_id: menu_id
  };
  var q = "Match (m:Menu) WHERE m.locu_id = {menu_id} RETURN m";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.create = function(menu, callback) {
  var params = {
    menu: menu
  };
  var q = "CREATE (menu:Menu {menu}) RETURN menu";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.update = function(menu_id, menu, callback) {
  var params = {
    menu_id: menu_id,
    changes: menu
  };
  var q = "";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.destroy = function(menu_id, callback) {
  var params = {
    menu_id: menu_id
  };
  var q = "";
  db.cypherQuery(q, params, function(err, result) {
    callback(err, result.data);
  });
};

module.exports = new Menu();
