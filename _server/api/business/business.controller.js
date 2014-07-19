// Request API access: http://www.yelp.com/developers/getting_started/api_access
'use strict';
var Business = require('./data.js')
var _ = require("underscore");
var yelp = require("yelp").createClient({
  consumer_key: "hq_KSPooNh3W8tq4royv5w",
  consumer_secret: "5Vhff5nu84H1pNMCQ_52INZuSfA",
  token: "IlX8Uxc60fR-rVzvkDC4tUkGqkhM3PKz",
  token_secret: "ujPERqZ93OkRsIj3vtLutJ1GTUo"
});
// See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({term: "food", location: "Montreal"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });
//
// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });
//
//

// var _ = require('lodash');

var businesses;

// Get list of links
exports.index = function(req, res) {
  // http://api.yelp.com/v2/search?term=food&location=San+Francisco
  yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
  //   console.log(error);
    businesses = data.businesses;
    res.json(200, data);
  });
};

// Get a single link
exports.show = function(req, res) {
  // Link.findById(req.params.id, function (err, link) {
  //   if(err) { return handleError(res, err); }
  //   if(!link) { return res.send(404); }
  //   return res.json(link);
  // });
  // yelp.search({term: "food", location: "yelp-san-francisco"}, function(error, data) {
  //   console.log(error);
  //   res.json(200, business);
  // });
  if(businesses.length){
    var business = _.where(businesses, {phone:req.params.id})
    res.json(200, business[0]);
  }else{
    res.end(404, "Businesses are not found.")
  }

};

// Creates a new link in the DB.
exports.create = function(req, res) {
  // Link.create(req.body, function(err, link) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, link);
  // });
};

// Updates an existing link in the DB.
exports.update = function(req, res) {
  // if(req.body._id) { delete req.body._id; }
  // Link.findById(req.params.id, function (err, link) {
  //   if (err) { return handleError(err); }
  //   if(!link) { return res.send(404); }
  //   var updated = _.merge(link, req.body);
  //   updated.save(function (err) {
  //     if (err) { return handleError(err); }
  //     return res.json(200, link);
  //   });
  // });
};

// Deletes a link from the DB.
exports.destroy = function(req, res) {
  // Link.findById(req.params.id, function (err, link) {
  //   if(err) { return handleError(res, err); }
  //   if(!link) { return res.send(404); }
  //   link.remove(function(err) {
  //     if(err) { return handleError(res, err); }
  //     return res.send(204);
  //   });
  // });
};

function handleError(res, err) {
  return res.send(500, err);
}
