'use strict';

var _ = require('lodash');
var Business = require('./business.model');
var Review = require('../review/review.model')
var Item = require('../item/item.model')
var yelp = require("yelp").createClient({
  consumer_key: "hq_KSPooNh3W8tq4royv5w",
  consumer_secret: "5Vhff5nu84H1pNMCQ_52INZuSfA",
  token: "IlX8Uxc60fR-rVzvkDC4tUkGqkhM3PKz",
  token_secret: "ujPERqZ93OkRsIj3vtLutJ1GTUo"
});
// Get list of Business
// exports.index = function(req, res) {
//   yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
//   //   console.log(error);
//     // businesses = data.businesses;
//     _(data.businesses).forEach(function(item){
//       console.log(item)
//       // Business.find({id: item.id, phone: item.phone}, function(err, business){
//       //   if(!business){
//           // Business.create(item, function(err, bus) {
//             // if(err) { return handleError(res, err); }
//             // return res.json(201, business);
//           // });
//       //   }
//       // })
//     })
//     // res.json(200, data);
//   });
//   // Business.find(function (err, businesses) {
//   //   if(err) { return handleError(res, err); }
//   //   return res.json(200, businesses);
//   // });
// };

//
// var ItemSchema = new Schema({
//   name: String,
//   business_id: { type: Schema.Types.ObjectId, ref: 'Business'},
//   user_id: { type: Schema.Types.ObjectId, ref: 'User'},
//   reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
//   rating: Number,
//   rating_count: Number,
//   created_at: Date
// });
//
// var ReviewSchema = new Schema({
//   title: String,
//   business_id: { type: Schema.Types.ObjectId, ref: 'Business'},
//   user_id: { type: Schema.Types.ObjectId, ref: 'User'},
//   item_id: { type: Schema.Types.ObjectId, ref: 'Item'},
//   comment: String,
//   agreed: Number,
//   disagreed: Number,
//   images: [ImageSchema],
//   agreed_users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
//   disagreed_users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
//   created_at: Date,
// });

exports.index = function(req, res){
  yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
    if(error) return handleError(res, error)
    res.json(200, data.businesses)
  // Business.find(function(error, businesses){
  //   if(error) return handleError(res, error)
  //   _(businesses).forEach(function(bus){
  //     Item.create({
  //       name: bus.name,
  //       business_id: bus._id,
  //       user_id: '53c5cf5c80a3c64a2669c8da',
  //       rating: bus.rating,
  //       review_count: bus.review_count,
  //       created_at: new Date()
  //     }, function(err, newItem){
  //       Review.create({
  //         comment: 'this is a new review comment',
  //         business_id: bus._id,
  //         user_id: '53c5cf5c80a3c64a2669c8da',
  //         item_id: newItem._id,
  //         images: [bus.image_url],
  //         created_at: new Date()
  //       }, function(err, rev){
  //         res.json(200, rev)
  //       })
  //     })
  //   })
  //
  })
  // Business.find(function(error, businesses){
    // if(error) return handleError(res, error)
    // _(businesses).forEach(function(bus){
    //   if(bus){
    //     Item.find({business_id: bus._id}, function(err, items){
    //       // if(items.length){
    //         _(items).forEach(function(item){
    //           // item.business = bus.id
    //           console.log(item)
    //           // item.save(function(err, result){
    //
    //           // })
    //         })
    //       // }
    //       // item.business_id = bus.id
    //       // item.
    //     })
    //   }
    // })
    // res.json(200, businesses)
  // })
};

// Get a single Business
exports.show = function(req, res) {
  yelp.business(req.params.id, function(err, business){
    if(err) { return handleError(res, err); }
    return res.json(business);
  })
  // Business.findById(req.params.id, function (err, business) {
  //   if(err) { return handleError(res, err); }
  //   if(!business) { return res.send(404); }
  //   return res.json(business);
  // });
};

// Creates a new Business in the DB.
exports.create = function(req, res) {
  Business.create(req.body, function(err, business) {
    if(err) { return handleError(res, err); }
    return res.json(201, business);
  });
};

// Updates an existing Business in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Business.findById(req.params.id, function (err, business) {
    if (err) { return handleError(err); }
    if(!business) { return res.send(404); }
    var updated = _.merge(business, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, business);
    });
  });
};

// Deletes a Business from the DB.
exports.destroy = function(req, res) {
  Business.findById(req.params.id, function (err, business) {
    if(err) { return handleError(res, err); }
    if(!business) { return res.send(404); }
    business.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
