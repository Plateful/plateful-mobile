(function() {
  var MenuClient, VenueClient, db, getMenuItemsPerMenu, getSampleVenus, locu;

  locu = require('locu');

  db = require('../neo4j').db;

  VenueClient = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5');

  MenuClient = new locu.MenuItemClient('bc529b42f30999730cbb731ce191f536186dc1f5');

  exports.testApi = function() {
    getSampleVenus();
  };

  getSampleVenus = function() {
    return MenuClient.search({
      category: 'restaurant',
      locality: 'San Francisco'
    }, function(response) {
      var id, menu, obj, params, query, _i, _len, _ref, _results;
      _ref = response.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        id = obj.id;
        delete obj.id;
        obj.locu_id = id;
        menu = obj.venue;
        delete obj.venue;
        params = {
          item: obj,
          menu: menu
        };
        query = "CREATE (m:Menu {menu})-[:HAS_ITEM]->(i:Item {item}) RETURN v,i";
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
    return db.cypherQuery('MATCH (v:Venue) RETURN v', function(err, result) {
      var obj, params, query, _i, _len, _ref, _results;
      _ref = result.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        params = {
          venu: obj.id
        };
        _results.push(query = "START n=node({venu}) CREATE (m:Menu {menu})");
      }
      return _results;
    });
  };

}).call(this);
