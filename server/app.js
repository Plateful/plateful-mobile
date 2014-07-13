var express = require('express');
// var config = require('./config/environment');


var _ = require('underscore');
var app = express();

var server = require('http').createServer(app);

require('./routes')(app);

server.listen(9000, '127.0.0.1', function () {
  console.log('Express server listening on %d, in %s mode', 9000);
});
