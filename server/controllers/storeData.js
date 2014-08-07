var db = require('../config/neo4j').db;
var _ = require('underscore');

// HERE we will take the passed in data and store it in NEO4J
// Format the data before passing it into NEO4J
// This File is being used by the api/menus/show route (controller.show)
module.exports.store = function(business, callback) {
  // Store the id in a property call Locu_id and remove the id property
  var locu_id = business.id;
  delete business.id;
  business.locu_id = locu_id;

  // Store the menu items array for iteration on callback
  var menus = business.menus;

  // NEO4J cannot take primitive object types or null values. Remove each.
  for (var key in business) {
    if (business[key] === null) {
      delete business[key];
    }
    if (typeof business[key] === 'object') {
      delete business[key];
    }
  }

  // Set the params to pass into the cypherQuery
  var params = {
    menu: business
  };

  // Create the query string
  var query = "CREATE (m:Menu {menu}) RETURN m";

  // Call the cypherQuery function, passing in the parameters and the query string.
  db.cypherQuery(query, params, function(err, result) {
    if (err) {
      throw err;
    }
    console.log("Data was stored", result.data[0]._id);

    // After storing the data, NEO4J returns the created node with an _id property
    // The _id property is used to CREATE a MATCH and/or EDGE from the menu to each of it's items.
    StoreMenus(menus, result.data[0]._id);

    // Call the passed in callback function.
    // The callback will retrieve the data in the menu.controller form the exports.show function.
    callback(result.data[0]);
  });
};

var StoreMenus = function(item, menu_id) {
  // Create a new Item in the database
  // Create a gallery node
  // Match the the Menu to the item using the passed in menu_id
  // Match the item to the gallery
  var giveToNeo = function(item, menu_id) {
    var menuParams, menuQuery;
    menuParams = {
      menu_id: menu_id,
      item: item
    };
    menuQuery = "START m=node({menu_id}) CREATE (m)-[:HAS_ITEM]->(i:Item {item})-[:GALLERY]->(g:Gallery) RETURN i";
    db.cypherQuery(menuQuery, menuParams, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("Item " + result.data[0]._id + ", " + result.data[0].name + " was sucessfully Stored");
    });
  };

  // Using recursion loop through the Array of Objects in order to find
  var findMenuItems = function(item, param, val) {
    var result = [];
    var search = function(item) {
      _.each(item, function(el, pos, item) {
        if (typeof el === 'object') {
          search(el);
        }
        if (el === val && pos === param) {
          result.push(item);
        }
      });
    };
    search(item);
    return result;
  };

  // Loop through the items array and call giveToNeo.
  // Pass in the menu_id in order to match the item to the menu.
  var items = findMenuItems(item, 'type', 'ITEM');
  for (var i = 0; i < items.length; i++) {
    var key = items[i];
    delete key.option_groups;
    delete key.type;
    console.log(key);
    giveToNeo(key, menu_id);
  }
};
