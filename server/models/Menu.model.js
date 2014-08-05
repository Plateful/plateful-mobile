(function() {
  var Menu, db;

  db = require('../config/neo4j').db;

  Menu = function() {
    return this.query = db.cypherQuery;
  };

  Menu.prototype.all = function(callback) {
    var q;
    q = "MATCH (menu:Menu) RETURN menu";
    return this.query(q, function(err, result) {
      return callback(err, result.data);
    });
  };

  Menu.prototype.find = function(menu_id, callback) {
    var params, q;
    params = {
      menu_id: menu_id
    };
    q = "Match (m:Menu) WHERE m.locu_id = {menu_id} RETURN m";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Menu.prototype.create = function(menu, callback) {
    var params, q;
    q = "CREATE (menu:Menu {menu}) RETURN menu";
    params = {
      menu: menu
    };
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Menu.prototype.update = function(menu_id, menu, callback) {
    var params, q;
    params = {
      menu_id: menu_id,
      changes: menu
    };
    q = "";
    return this.query(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

  Menu.prototype.destroy = function(menu_id, callback) {
    var params, q;
    params = {
      menu_id: menu_id
    };
    q = "";
    return db.cypherQuery(q, params, function(err, result) {
      return callback(err, result.data);
    });
  };

}).call(this);
