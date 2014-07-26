(function() {
  var Factual, FactualSearch, Locu, LocuSearch, NEO, Yelp, YelpSearch, zips, _;

  _ = require('lodash');

  Yelp = require('./config/api/yelp');

  Factual = require('./config/api/factual');

  Locu = require('./config/api/locu');

  NEO = require('./config/api/neo4j');

  zips = [94102, 94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158];

  exports.createMenu = function(req, res) {};

  exports.createItem = function(req, res) {};

  FactualSearch = function() {};

  YelpSearch = function() {};

  LocuSearch = function() {};

}).call(this);
