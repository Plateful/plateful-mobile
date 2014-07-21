// minjung1009
'use strict';

var _ = require('lodash');
var Business = require('./business.model');
var Review = require('../review/review.model')
var Item = require('../item/item.model')
var Factual = require('factual-api');
var factual = new Factual('5E36K4TGpjZnbYq0X4pCx8WAm97afFGNodPaJABg', 'mTGqsSOXNNlGzgNMbcgM0UOrHdeQmdqdMD03sm9i');
var http = require('http')
var yelp = require("yelp").createClient({
  consumer_key: "hq_KSPooNh3W8tq4royv5w",
  consumer_secret: "5Vhff5nu84H1pNMCQ_52INZuSfA",
  token: "IlX8Uxc60fR-rVzvkDC4tUkGqkhM3PKz",
  token_secret: "ujPERqZ93OkRsIj3vtLutJ1GTUo"
});

var db = require('../../config/neo4j').db
// db.listAllLabels(function(err, labels){


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
var bus = { is_claimed: true,
  rating: 5,
  mobile_url: 'http://m.yelp.com/biz/bay-area-box-express-san-francisco-3',
  rating_img_url: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png',
  review_count: 505,
  name: 'Bay Area Box Express',
  snippet_image_url: 'http://s3-media2.fl.yelpcdn.com/photo/d23aBbX53OSloz5c2Wi1Jg/ms.jpg',
  rating_img_url_small: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/c7623205d5cd/ico/stars/v1/stars_small_5.png',
  url: 'http://www.yelp.com/biz/bay-area-box-express-san-francisco-3',
  phone: '4153283832',
  snippet_text: 'very efficient and awesome. i contacted them on Monday and by Wednesday i had all i wanted at my doorstep.the arrival of my package didn\'t take long since...',
  image_url: 'http://s3-media1.fl.yelpcdn.com/bphoto/cURb4Bv-W4wJe4LuSJRYHQ/ms.jpg',
  categories: [ [ 'Movers', 'movers' ] ],
  display_phone: '+1-415-328-3832',
  rating_img_url_large: 'http://s3-media3.fl.yelpcdn.com/assets/2/www/img/22affc4e6c38/ico/stars/v1/stars_large_5.png',
  id: 'bay-area-box-express-san-francisco-3',
  is_closed: false,
  location:
   { city: 'San Francisco',
     display_address: [ 'Financial District', 'San Francisco, CA 94105' ],
     geo_accuracy: 9,
     neighborhoods: [ 'Financial District', 'SoMa', 'South Beach' ],
     postal_code: '94105',
     country_code: 'US',
     address: [],
     coordinate: { latitude: 37.7929386536957, longitude: -122.3923764021 },
     state_code: 'CA' } }

exports.index = function(req, res){
  db.cypherQuery("MATCH (i:Menu) RETURN i", function(err, result){
    if(err) handleError(res, err)
      console.log(result.data.length);
    res.json(201, result.columns);
  })

};
function base64_encode(bitmap) {
  return new Buffer(bitmap).toString('base64');
}
// q=the container store&filters={"namespace":"yelp"}
// // factual.get('/t/crosswalk?q=the container store&filters={"namespace":"yelp"}',
// factual.get('/t/places-us/85a2b80e-fb91-4224-bbbb-26caf113b28a',
// filters={"namespace":"foursquare","namespace_id":"4ae4df6df964a520019f21e3"}

function runYelp(item){
  yelp.search({term: item.name, location:item.locality }, function(error, data){
    _(data.businesses).forEach(function(bus){
      Business.find({name: bus.name}, function(err, business){
        if(business[0]){
          console.log(business[0]);
          business[0].yelp_id = bus.id
          business[0].image_url = bus.image_url
          business[0].save(function(err, yolo){
            console.log("new", yolo);

          })
        }
        // business.yelp_id =
      })
      // var newBus = new Business(bus)
      // newBus.factual_id = item.factual_id;
      // newBus.yelp_id = bus.id;
      // newBus.save(function(err, newBusiness){
      //   console.log(newBusiness);
      // })
    })
  })
}

function runFactual(body){

}

exports.getByLocation = function(req, res){
  // console.log(req.body);

  factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}},
    function (error, result) {
      var buses = []
      // console.log(result.data);
      // _(result.data).forEach(function(item, index){
        Business.find(function(err, businesses){
          for (var i = 0; i < result.data.length; i++) {

            for (var j = 0; j < businesses.length; j++) {
              if(result.data[i].factual_id === businesses[j].factual_id){
                result.data[i].image_url = businesses[j].image_url
                result.data[i].yelp_id = businesses[j].yelp_id
              }

            }

          }
          // console.log(result.data);
          res.json(result.data)
          // result.data[index].image_url = business[0].image_url
          // console.log(result.data[index]);

        })
        // runYelp(item)
        // console.log(item);
        // var newBus = new Business({
        //   factual_id: item.factual_id,
        //   name: item.name
        // })
        // // newBus.yelp_id = bus.id;
        // newBus.save(function(err, newBusiness){
        //   console.log(newBusiness);
        // })
        // Business.find({factual_id: item.factual_id}, function(err, businesses){
          //console.log('businesses----------', businesses);
          // Business.remove({factual_id: item.factual_id}, function(err, results){
          //
          // })
          // busses.concat()
        // })
      // })

  });
}
  // var params = []
  // var u = 'cll=' + req.body.latitude + ',' + req.body.longitude
  // console.log({'ll': [req.body.latitude,req.body.longitude]});
  // params.push(params)
  // yelp.search({'ll': [req.body.latitude,req.body.longitude]}, function(error, businesses){
  //   if(error) return handleError(res, error)
  //     return res.json(businesses)
  // })

// Get a single Business
exports.show = function(req, res) {
  db.cypherQuery('MATCH (m:Menu {factual_id: "'+req.params.id+'"})-[:HAS_ITEM]->(i) RETURN m,i', function(err, result){
    if (!result.data.length){
      factual.get('/t/places-us/' + req.params.id, function (error, business) {
        yelp.search({term: business.data[0].name, location: business.data[0].locality}, function(err, yelpBus){
          if(yelpBus.businesses.length){
            console.log("FACTURL--------", business.data[0]);
            var obj = yelpBus.businesses[0]
            obj.factual_id = business.data[0].factual_id
            // console.log(obj);
            doNeoStore(obj, function(data){
              // res.json(200, data)
              db.cypherQuery('MATCH (m:Menu {factual_id: "'+req.params.id+'"})-[:HAS_ITEM]->(i) RETURN m,i', function(err, newResult){
                console.log("neo----", newResult.data);
                res.json(newResult.data)
              })

            })

            // console.log("YELP--------", yelpBus.businesses[0]);
            // res.json(yelpBus.businesses[0]);
          }
        })
        // db.cypherQuery()
        // console.log(business.data[0]);
        // console.log(error);
      });
    } else {
      res.json(result.data);
    }
  })
  // yelp.business(req.params.id, function(err, business){
  //   if(err) { return handleError(res, err); }
  //   return res.json(business);
  // })
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

function doNeoStore(bus, cb){
  console.log("fomr doNeoStore", bus);
  db.cypherQuery(
    "CREATE (m:Menu {"+
     "factual_id: \""+bus.factual_id+"\","+
     "yelp_id: \""+bus.id+"\","+
     "name: \""+bus.name+"\","+
     "phone: \""+bus.phone+"\","+
     "display_phone: \""+bus.display_phone+"\","+
     "image_url: \""+bus.image_url+"\","+
     "street: \""+bus.location.cross_streets+"\","+
     "address: \""+bus.location.address[0]+"\","+
     "city: \""+bus.location.city+"\","+
     "postal_code: \""+bus.location.postal_code+"\","+
     "country_code: \""+bus.location.country_code+"\","+
     "state_code: \""+bus.location.state_code+"\""+
    "})," +
    "(i1:Item {name: \""+bus.name+"\", rating: \""+bus.rating+"\", review_count: \""+bus.review_count+"\", likes: 10, top_image_url: \""+bus.image_url+"\" }),"+
    "(r1:Review {created_at: timestamp()}),"+
    "(e1:Essay {review_text: \""+bus.snippet_text+"\", down: 5, up: \""+bus.review_count+"\"}),"+
    "(p1:Photo {"+
      "image_url: \""+bus.image_url+"\","+
      "likes: \""+bus.review_count+"\","+
      "is_top: true"+
    "}),"+
    "(rate1:Rating {value: \""+bus.rating+"\"}),"+
    "(m)-[:HAS_ITEM]->(i1),"+
    "(r1)-[:REVIEW_OF]->(i1),"+
    "(r1)-[:HAS_ESSAY]->(e1),"+
    "(r1)-[:HAS_PHOTO]->(p1),"+
    "(r1)-[:HAS_RATE]->(rate1) RETURN m",
    function(err, result){
        if(err) throw err;
        // cb(true)
        console.log("neo----", result.data);
        // console.log(result.data); // delivers an array of query results
        // console.log(result.columns); // delivers an array of names of objects getting returned
        // res.json(result.data)
        cb(result.data)
        // res.json(result.data)
        // res.json(200, result)
    });
}
