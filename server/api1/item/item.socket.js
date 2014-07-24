/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Item = require('./item.model');

exports.register = function(socket) {
  Item.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Item.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('item:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('item:remove', doc);
}