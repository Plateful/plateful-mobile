'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var db = require('../../config/neo4j').db
// var Business = require('')
var Review = require('../review/review.model')
var Business = require('../business/business.model')
// Get list of items
// exports.index = function(req, res) {
//   Item.find(function (err, items) {
//     if(err) { return handleError(res, err); }
//     _(items).forEach(function(item){
//       // return res.json(200, item)
//       Business.findById(item.business_id, function(err, bus){
//         if(bus){
//           item.top_image_url = bus.image_url
//           item.save(function(err, newItem){
//
//           })
//         }
//         var rev = new Review({
//           comment: 'this is a new review comment',
//           business_id: item.business_id,
//           user_id: '53c5cf5c80a3c64a2669c8da',
//           item_id: item._id,
//           // images: [bus.image_url],
//           created_at: new Date()
//         })
//         if(bus){
//           rev.images.push({image_url: bus.image_url})
//           console.log(rev)
//         }
//
//         rev.save(function(err, newRev){
//           // res.json(200, newRev)
//         })
//
//       })
//     })
//     return res.json(200, 'items');
//   });
// };
exports.index = function(req, res) {
  // Item.find(function(err, items){
  //   if(err) return handleError(res, err)
  //   res.json(200, items)
  // })
  db.cypherQuery('MATCH (i:Item) return i', function(err, result){
    if (err) return handleError(res, err)
    res.json(201, result.data)
  })
}
exports.getByBusiness = function(req, res) {
  var business_id = req.params.business_id;
  Item.find({business: business_id}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};
exports.getByUser = function(req, res) {
  var user_id = req.params.user_id;
  Item.find({user_id: user_id}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};
exports.getByLocation = function(req, res) {
  // yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
  // var user_id = req.params.user_id;
  var location = req.body.location
  Item.find(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single item
exports.show = function(req, res) {
  console.log(req.params.id);
  db.cypherQuery('MATCH (n) WHERE id(n) = '+req.params.id+' RETURN n',
  function(err, result){
    if(err) return handleError(res, err)
      console.log("item", result.data);
    res.json(200, result.data)
  })
  // Item.findById(req.params.id, function (err, item) {
  //   if(err) { return handleError(res, err); }
  //   if(!item) { return res.send(404); }
  //     Review.find({item_id: req.params.id}, function(err, reviews){
  //       if(err) { return handleError(res, err); }
  //       if(reviews.length){
  //         item.reviews = reviews
  //       }
  //       return res.json(item);
  //     })
  // });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  console.log(req.body)
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    console.log(item)
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(err); }
    if(!item) { return res.send(404); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, item);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

//
// items.foreach(function(item){
//   Item.create(item, function(err, newItem) {
//
//     console.log(newItem)
//
//   });
// })
