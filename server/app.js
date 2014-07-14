var express = require('express');
// var config = require('./config/environment');


var _ = require('underscore');
var app = express();

// var port = process.env.PORT or || 9000

var port = 9000

var server = require('http').createServer(app);

require('./routes')(app);

server.listen(port, '127.0.0.1', function () {
  console.log('Express server listening on %d, in %s mode', 9000);
});
