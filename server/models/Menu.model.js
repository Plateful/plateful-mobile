var db = require('../config/neo4j').db;

var Menu = function() {
  this.query = db.cypherQuery;
};

Menu.prototype.all = function(callback) {
  var q = "MATCH (menu:MENU) WHERE menu.place_id IS NULL RETURN menu";
  db.cypherQuery(q, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.find = function(menu_id, callback) {
  var params = {
    id: Number(menu_id)
  };
  var q = "START menu=node({id}) RETURN menu";
  db.cypherQuery(q, params, function(err, result) {
    if(err){
      return callback(err, result);
    }
    callback(err, result.data[0]);
  });
}

// Takes a menu_id parameter. Returns all its items.
Menu.prototype.getMenuItems = function(menu_id, callback) {
  // Cypher requires a number for the start value.
  var params = {
    id: Number(menu_id)
  };
  var q = "START menu=node({id}) MATCH menu-[:HAS_ITEMS]->(i:ITEM) RETURN i";
  db.cypherQuery(q, params, function(err, result) {
    if(err){
      return callback(err, result);
    }
    callback(err, result.data);
  });
};

Menu.prototype.getByLocation = function(data, callback) {
  // Handle whole number distance numbers. Numbers without decimals will throw errors.
  var distString = (data.dist).toString();
  if (distString.indexOf('.') === -1) {
    data.dist = distString + '.0';
  }

  var params = {
    dist: "withinDistance:["+data.lat+","+data.lng+","+data.dist+"]"
  };
  var q = [
    "START i=node:geom({dist}) ",
    "MATCH (i)<-[:HAS_ITEMS]-(m:MENU) ",
    "RETURN DISTINCT m"
  ].join('');
  
  db.cypherQuery(q, params, function(err, result) {
    if (err) {
      return callback(err);
    }
    return callback(err, result.data);
  })
}

Menu.prototype.create = function(menu, callback) {
  var params = {
    menu: menu
  };
  var q = "CREATE (menu:Menu {menu}) RETURN menu";
  this.query(q, params, function(err, result) {
    callback(err, result.data);
  });
};

Menu.prototype.update = function(res, menu_id, menu, callback) {
  console.log(menu_id);
  delete menu.menu_id;
  var menu_id = Number(menu_id);
  var params = {
    menu_id: menu_id,
    place_id: menu.place_id,
    address : menu.address,
    lat: menu.lat,
    lng: menu.lng
  };
  var q = ["START menu=node({menu_id})",
            "SET menu.place_id = {place_id}",
            "SET menu.address = {address}",
            "SET menu.latitude = {lat}",
            "SET menu.longitude = {lng}",
            "RETURN menu"].join("");
  db.cypherQuery(q, params, function(err, result) {
    console.log(err);
    if (err) {
      return handleError(res, err);
    }
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


var handleError = function(res, err) {
  res.status(500);
  return res.send(err);
};

module.exports = new Menu();
