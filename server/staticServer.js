// Simple server for running static client files.
var http = require('http');
var ecstatic = require('ecstatic');

var staticRoot = 'www';
var port = 4400;

http.createServer(ecstatic({root: staticRoot})).listen(port);
console.log("HTTP server listening on " + port);
