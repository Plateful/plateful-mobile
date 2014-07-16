'use strict';

var _ = require('lodash');
var Business = require('./business.model');
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

exports.index = function(req, res){
  Business.find(function(error, businesses){
    if(error) return handleError(res, error)
    res.json(200, businesses)
  })
};

// Get a single Business
exports.show = function(req, res) {
  Business.findById(req.params.id, function (err, business) {
    if(err) { return handleError(res, err); }
    if(!business) { return res.send(404); }
    return res.json(business);
  });
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
