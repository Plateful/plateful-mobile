(function() {
  'use strict';
  var config, onConnect, onDisconnect;

  config = require('./environment');

  onDisconnect = function(socket) {};

  onConnect = function(socket) {
    return socket.on('info', function(data) {
      return console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });
  };

  module.exports = function(socketio) {
    socketio.set('log level', 2);
    return socketio.sockets.on('connection', function(socket) {
      socket.address = socket.handshake.address.address + ':' + socket.handshake.address.port;
      socket.connectedAt = new Date();
      socket.on('disconnect', function() {
        onDisconnect(socket);
        return console.info('[%s] DISCONNECTED', socket.address);
      });
      onConnect(socket);
      return console.info('[%s] CONNECTED', socket.address);
    });
  };

}).call(this);
