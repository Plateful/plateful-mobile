'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  business_id: { type: Schema.Types.ObjectId, ref: 'Business'},
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
  rating: Number,
  review_count: Number,
  description: String,
  price: String,
  top_image_url: String,
  created_at: Date
});

module.exports = mongoose.model('Item', ItemSchema);
