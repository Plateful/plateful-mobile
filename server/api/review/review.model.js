'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  image_url: String,
  likes: Number,
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

var ReviewSchema = new Schema({
  title: String,
  business_id: { type: Schema.Types.ObjectId, ref: 'Business'},
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  item_id: { type: Schema.Types.ObjectId, ref: 'Item'},
  rating: Number,
  comment: String,
  agreed: Number,
  disagreed: Number,
  images: [ImageSchema],
  agreed_users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  disagreed_users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  created_at: Date,
});

module.exports = mongoose.model('Review', ReviewSchema);
