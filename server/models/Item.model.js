var db = require('../config/neo4j').db;
var serif = require('../config/neo4j').serif;
var _ = require('lodash')


// serif.query('START n = node(24233) RETURN n', function(err, result){
//   console.log(result);
// })

// serif.save({ name: "Test-Man", age: 40 }, function(err, node) {
//   if (err) throw err;
//   console.log("Test-Man inserted.");
//
//   serif.delete(node, function(err) {
//     if (err) throw err;
//     console.log("Test-Man away!");
//   });
// });

// db.readRelationshipsOfNode(24228, {
//     types: ['HAS_ITEMS'], // optional
//     direction: 'out' // optional, alternative 'out', defaults to 'all'
//     }, function(err, relationships) {
//         if (err) throw err;
//
//         console.log(relationships); // delivers an array of relationship objects.
// });
var Item = function() {
  this.query = db.cypherQuery;
};

Item.prototype.all = function(callback) {

  db.cypherQuery('MATCH (i:ITEM)-[:HAS_PHOTOS]->(:ITEM_PHOTOS)-->(p), (i)<-[:HAS_ITEMS]-(m:MENU) RETURN m,i,p LIMIT 25', function(err, result){
    console.log(result.data);
    var obj = _.map(result.data, function(i, p){
      // console.log("m", m);
      // console.log("p", p);
      console.log(i);
      return {
        menu: i[0],
        name: i[1].name,
        _id: i[1]._id,
        photos: i[2]
      }
    })
    // console.log(obj);
    // for(var i=0; i < result.data.length; i++){
    //   var obj = {
    //     name: result.data[i][0].name,
    //     photos: result.data[i][1]
    //   }
    //   result.data[i] = obj
    // }
    callback(err, obj)
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
