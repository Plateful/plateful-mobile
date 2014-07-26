(function() {
  var StoreMenus, db, _;

  db = require('../../config/neo4j').db;

  _ = require('underscore');

  module.exports.store = function(item, callback) {
    var key, locu_id, menus, params, query;
    locu_id = item.id;
    delete item.id;
    item.locu_id = locu_id;
    menus = item.menus;
    for (key in item) {
      if (item[key] === null) {
        delete item[key];
      }
      if (typeof item[key] === 'object') {
        delete item[key];
      }
    }
    params = {
      menu: item
    };
    query = "CREATE (m:Menu {menu}) RETURN m";
    return db.cypherQuery(query, params, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("Data was stored", result.data[0]._id);
      StoreMenus(menus, result.data[0]._id);
      return callback(result.data[0]);
    });
  };

  StoreMenus = function(item, menu_id) {
    var findMenuItems, giveToNeo, items, key, _i, _len, _results;
    giveToNeo = function(item, menu_id) {
      var menuParams, menuQuery;
      menuParams = {
        menu_id: menu_id,
        item: item
      };
      menuQuery = "START m=node({menu_id}) CREATE (m)-[:HAS_ITEM]->(i:Item {item})-[:GALLERY]->(g:Gallery) RETURN i";
      return db.cypherQuery(menuQuery, menuParams, function(err, result) {
        if (err) {
          throw err;
        }
        return console.log("Item " + result.data[0]._id + ", " + result.data[0].name + " was sucessfully Stored");
      });
    };
    findMenuItems = function(item, param, val) {
      var result, search;
      result = [];
      search = function(item) {
        return _.each(item, function(el, pos, item) {
          if (typeof el === 'object') {
            search(el);
          }
          if (el === val && pos === param) {
            return result.push(item);
          }
        });
      };
      search(item);
      return result;
    };
    items = findMenuItems(item, 'type', 'ITEM');
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      key = items[_i];
      delete key.option_groups;
      delete key.type;
      console.log(key);
      _results.push(giveToNeo(key, menu_id));
    }
    return _results;
  };

}).call(this);
