var db = require('../config/neo4j').db;
var spatial = require('../config/neo4j').spatial;
var spatialURI = require('../config/neo4j').spatialURI;
var serif = require('../config/neo4j').serif;
var _ = require('lodash');

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
//
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
      };
    });
    // console.log(obj);
    // for(var i=0; i < result.data.length; i++){
    //   var obj = {
    //     name: result.data[i][0].name,
    //     photos: result.data[i][1]
    //   }
    //   result.data[i] = obj
    // }
    callback(err, obj);
    // console.log(result);
    // res.json(201, result.data);
  });
};

Item.prototype.find = function(item_id, callback) {
  var params = {
    id: Number(item_id)
  };
  var query = "START item=node({id}) RETURN item";
  db.cypherQuery(query, params, function(err, result) {
    callback(err, result.data);
  });
};

Item.prototype.getItemPhotos = function(item_id, callback){
  var params = {item_id:Number(item_id)};
  var query = "START item=node({item_id}) MATCH item-[:HAS_PHOTOS]->()-->(p) RETURN p";
  db.cypherQuery(query, params, function(err, result){
    // console.log("photos", result.data);
    if(err) return callback(err, result)

    callback(err, result.data)
  })

}


Item.prototype.findByMenu = function(menu_id, callback) {
  var params = {
    menu: Number(menu_id)
  };
  var query = [
    "START menu=node({menu}) ",
    "MATCH (menu)-[:HAS_ITEMS]->(item:ITEM), ",
    "(item)-[:HAS_REVIEWS]->(reviews:ITEM_REVIEWS)-[:HAS_REVIEW]->(review:ITEM_REVIEW), ",
    "(item)-[:HAS_PHOTOS]->(photos:ITEM_PHOTOS)-[:HAS_PHOTO]->(photo:ITEM_PHOTO) ",
    "RETURN item, review, photo"
  ].join('');
  db.cypherQuery(query, params, function(err, result) {
    if (err) {
      return callback(err, result)
    }
    return callback(err, result.data);
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
  var data = JSON.parse(data);
  var params = {
    dist: "withinDistance:["+data.lat+","+data.lng+","+data.dist+".0]"
    // dist: "withinDistance:[37.783692599999995,-122.409235,"+data.dist+".0]"
  };
  console.log("model params", params);

  var query = 'START n=node:geom({dist}) RETURN n';
  db.cypherQuery(query, params, function(err, result) {
    // console.log(result.data)
    callback(err, result);
  });
};

Item.prototype.findWhere = function() {};

Item.prototype.findWith = function() {};

Item.prototype.create = function(menu_id, item_name, callback) {
  var params = {
    menu_id: menu_id,
    item_name: item_name
  };
  var query = ["START menu=node({menu_id}) ",
              "CREATE menu-[:HAS_ITEM]->(item:ITEM {name:{item_name}}), ",
              "item.menu_name = menu.name, ",
              "item.lat = menu.latitude, ",
              "item.lon = menu.longitude, ",
              "RETURN item;"].join("");
  this.query(query, params, function(err, result) {
    var item = result.data[0];
    Item.createSpatialIndex(item._id);
    callback(err, result.data);
  });
};

Item.prototype.createSpatialIndex = function(id){
  request.post(
    spatial,
    {json:{'key':'dummy', 'value':'dummy', 'uri':spatialURI+id}},
    function(err, res, body){
      if(err){
        console.log("---------------------------err", error);
        if (!error && response.statusCode == 200) {
            console.log("BODY",  body);
        }
      }
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!', err);
      console.log("body", body);
    }
  );
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
