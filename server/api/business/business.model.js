'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  id: String,
  factual_id: String,
  yelp_id: String,
  image_url: String,
  location: {
    address: Array,
    city: String,
    coordinate: {
      latitude: Number,
      longitude: Number,
    },
    country_code: String,
    cross_street: String,
    display_address: Array,
    geo_accuracy: Number,
    neighborhoods: Array,
    postal_code: String,
    state_code: String,
  },
  menu_date_updated: Date,
  menu_provider: String,
  mobile_url: String,
  name: String,
  phone: String,
  rating: Number,
  review_count: Number,
  categories: Array
});

module.exports = mongoose.model('Business', BusinessSchema);
