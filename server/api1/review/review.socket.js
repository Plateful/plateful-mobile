/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Review = require('./review.model');

exports.register = function(socket) {
  Review.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Review.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('review:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('review:remove', doc);
}