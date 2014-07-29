(function() {
  var StoreMenus, db, _;

  db = require('../../config/neo4j').db;

  _ = require('underscore');

  module.exports.store = function(business, callback) {
    var key, locu_id, menus, params, query;
    locu_id = business.id;
    delete business.id;
    business.locu_id = locu_id;
    menus = business.menus;
    for (key in business) {
      if (business[key] === null) {
        delete business[key];
      }
      if (typeof business[key] === 'object') {
        delete business[key];
      }
    }
    params = {
      menu: business
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
