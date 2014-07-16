/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Link = require('./link.model');

exports.register = function(socket) {
  Business.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Business.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('business:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('business:remove', doc);
}
