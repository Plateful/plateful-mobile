(function() {
  var VenueClient, db, fs, getMenuItemsPerMenu, getSampleVenus, locu;

  locu = require('locu');

  db = require('../neo4j').db;

  fs = require('fs');

<<<<<<< HEAD
  module.exports.VenueClient = VenueClient = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5');
=======
  VenueClient = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5');
>>>>>>> 3b19824b4d1a8f0f2f879ccb6fd06356319fa93d

  exports.testApi = function() {};

  getSampleVenus = function() {
    return VenueClient.search({
      has_menu: true,
      category: 'restaurant',
      locality: 'San Francisco'
    }, function(response) {
      var id, obj, params, query, _i, _len, _ref, _results;
      _ref = response.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        id = obj.id;
        delete obj.id;
        obj.locu_id = id;
        params = {
          menu: obj
        };
        query = "CREATE (m:Menu {menu}) RETURN m";
        _results.push(db.cypherQuery(query, params, function(err, result) {
          if (err) {
            throw err;
          }
          return console.log(result.data);
        }));
      }
      return _results;
    });
  };

  getMenuItemsPerMenu = function() {
    return db.cypherQuery('Match (m:Menu) RETURN m', function(err, neo) {
      var ids, item, _i, _len, _ref, _results;
      ids = [];
      _ref = neo.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(VenueClient.get_details(item.locu_id, function(result) {
          console.log(result.objects[0]);
          return fs.appendFile('./menu.txt', "@$@locu_id " + result.objects[0].id + ", \n" + (JSON.stringify(result.objects[0])) + "\n\n", function(err) {
            if (err) {
              throw err;
            }
            return console.log('The "data to append" was appended to file!');
          });
        }));
      }
      return _results;
    });
  };

}).call(this);
