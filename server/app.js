/**
 * Main application file
 */

// Set default node environment to development.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

// Populate DB with sample data.
if (config.seedDB) {
  require('./config/seed');
}

// Setup server.
var app = express();
var server = require('http').createServer(app);

// configure socket.io
// require('./config/socketio')(socketio);
// var socketio = require('socket.io').listen(server);

// Set config variables
require('./config/express')(app);
// app.use( require( './config/api/locu' ).testApi() )

// Set app API routes
require('./routes').applyRoutes(app);
require('./config/api/locu').testApi();

// Start server.
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app.
exports = module.exports = app;
