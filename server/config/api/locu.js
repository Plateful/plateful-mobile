// KEY is your API key, found on dev.locu.com
var MenuClient, VenueClient;
var locu = require('locu');
var db = require('../neo4j').db;
var fs = require('fs');

module.exports.VenueClient = VenueClient = new locu.VenueClient('bc529b42f30999730cbb731ce191f536186dc1f5');
module.exports.MenuClient = MenuClient = new locu.MenuItemClient('bc529b42f30999730cbb731ce191f536186dc1f5');

exports.testApi = function() {};

var getSampleVenus = function() {
  VenueClient.search({
    has_menu: true,
    category: 'restaurant',
    locality: 'San Francisco'
  }, function(response) {
    for (var i = 0; i < response.objects.length; i++) {
      var obj = response.objects[i];
      var id = obj.id;
      delete obj.id;
      obj.locu_id = id;
      var params = {
        menu: obj
      };
      var query = "CREATE (m:Menu {menu}) RETURN m";
      db.cypherQuery(query, params, function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result.data);
      });
    }
  });
};

var getMenuItemsPerMenu = function() {
  db.cypherQuery('Match (m:Menu) RETURN m', function(err, neo) {
    var ids = [];
    for (i = 0; i < neo.data.length; i++) {
      var item = neo.data[i];
      VenueClient.get_details(item.locu_id, function(result) {
        console.log(result.objects[0]);
        fs.appendFile('./menu.txt', "@$@locu_id " + result.objects[0].id + ", \n" + (JSON.stringify(result.objects[0])) + "\n\n", function(err) {
          if (err) {
            throw err;
          }
          console.log('The "data to append" was appended to file!');
        });
      });
    }
  });
};
