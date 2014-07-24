// minjung1009
//NEED TO IMPROVE UPDATE QUERY
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

exports.getByLocation = function(req, res){
  factual.get('/t/places/', {q:req.body.val, geo:{"$circle":{"$center":[req.body.lat,req.body.lng],"$meters":5000}}},
    function (error, result) {
      res.json(200, result.data)
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
            doNeoStore(yelpBus.businesses[0],business.data[0], function(data){
              db.cypherQuery('MATCH (m:Menu {factual_id: "'+req.params.id+'"})-[:HAS_ITEM]->(i) RETURN m,i', function(err, newResult){
                console.log("neo----", newResult.data);
                res.json(newResult.data)
              })
            })
          }
        })
      });
    } else {
      res.json(result.data);
    }
  })
};

// Creates a new Business in the DB.
//working
exports.create = function(req, res) {
  var query = "CREATE (menu:Menu {menu}) RETURN menu"
  var menu = {
    factual_id : "0bf93772-75c7-4710-889d-9f407d612706",
    name: "Thai Gourmet Group",
    address: "845 Market Street",
    locality: "San Francisco",
    region: "CA",
    postcode: 94103,
    country: 'US',
    tel: '(415)-538-0800',
    latitude: 37.784268,
    longitude: -122.406917,
    website: 'http://www.leftyodouls.biz'
  }
  var params = {menu:menu};
  db.cypherQuery(query, params, function(err, result){
    if(err){
      console.log(err);
      handleError(res, err)
    }
    res.json(result.data);
  });
};

// Updates an existing item in the DB.
//working but NEED TO CHANGE THE QUERY TO ONLY UPDATE CERTAIN ATTRIBUTES INSTEAD OF REMOVING ALL
exports.update = function(req, res) {
  var params = {changes:req.body};
  var query = "START menu=node("+ req.params.id + ") SET menu = {changes} RETURN menu"
  db.cypherQuery(query, params, function(err, result){
    res.json(201, 'Item with ID of '+ req.body.id +' was Updated', result.data)
  })
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  var params = {id:req.params.id}
  var query = "START b=node({id})"+
              "MATCH (b)-[r]->(items),"+
              "(items)-[r2:REVIEW]->(review),"+
              "(review)-[r3]->(content),"+
              "(review)<-[r4]-()"
              "DELETE b,r,items,r2,review,r3,content,r4"
  db.cypherQuery(query, params, function(err, result){
    if (err) return handleError(req, err)
    res.json(201, 'Item with ID of '+req.body.id+' was Deleted', result.data)
  })
};

function handleError(res, err) {
  return res.send(500, err);
}

function doNeoStore(yelp, fact, cb){
  var menu = {
    factual_id: fact.factual_id,
    face: yelp.image_url,
    body: "Top Dish Body Text",
    name:fact.name,
    email: fact.email,
    phone:fact.tel,
    fax:  fact.fax,
    website: fact.website,
    street:  fact.address,
    city:  fact.locality,
    state: fact.region,
    zip:  fact.postcode,
    country:  fact.country,
    cross_streets:  yelp.location.cross_streets,
    latitude: fact.latitude,
    longitude: fact.longitude,
    display_hours: fact.hours_display
    // yelp_id: yelp.id,
    // yelp_name: yelp.name,
  }
  var dish1 = {
    name: "Dish 1 name",
    face: yelp.image_url,
    body: "Top Essay Body Text",
    review_count: yelp.review_count,
    rating: yelp.rating,
    likes: yelp.review_count
  }
  var dish2 = {
    name: "Dish 2 name",
    face: yelp.image_url,
    body: "Top Essay Body Text",
    review_count: yelp.review_count,
    rating: yelp.rating,
    likes: yelp.review_count
  }
  var review1= {
    created_at: timestamp(),
    memo: 'Private memo',
    bill_amount: 0.00,
    tip: 0.00
  }
  var review2= {
    created_at: timestamp(),
    memo: 'Private memo',
    bill_amount: 0.00,
    tip: 0.00
  }
  var essay1 = {
    text: yelp.snippet_text,
    down: 0,
    up: 0
  }
  var essay2 = {
    text: "Review text for dish 2",
    down: 0,
    up: 0
  }
  var photo1 = {
    image_url: yelp.image_url,
    likes: yelp.review_count
  }
  var photo2 = {
    image_url: yelp.image_url,
    likes: yelp.review_count
  }
  var star1 = {
    value: 3.0,
  }
  var star2 = {
    value: 3.0,
  }
  var params = {
    menu: menu,
    dish1: dish,
    dish2: dish,
    review1: review1,
    review2: review2,
    essay1: essay1,
    essay2: essay2,
    photo1: photo1,
    photo2: photo2,
    star1: star1,
    star2: star2
  }
  var query = "CREATE (m:Menu {menu}),"+
              "(d1:Dish {item1}),"+
              "(d2:Item {item2}),"+
              "(r1:Review {review1}),"+
              "(r2:Review {review2}),"+
              "(e1:Essay {essay1}),"+
              "(e2:Essay {essay2}),"+
              "(p1:Photo {photo1}),"+
              "(p2:Photo {photo2}),"+
              "(star1:Star {star1}),"+
              "(star2:Star {star2}),"+
              "(m)-[:OFFERS]->(d1),"+
              "(m)-[:OFFERS]->(d2),"+
              "(d1)-[:HAS_PHOTO]->(p1),"+
              "(d1)-[:HAS_ESSAY]->(e1),"+
              "(d1)-[:HAS_STAR]->(star1),"+
              "(d2)-[:HAS_PHOTO]->(p2),"+
              "(d2)-[:HAS_ESSAY]->(e2),"+
              "(d2)-[:HAS_STAR]->(star2),"+
              "(r)-[:REVIEW_OF]->(i),"+
              "(r)-[:HAS_ESSAY]->(e),"+
              "(r)-[:HAS_PHOTO]->(p),"+
              "(r)-[:HAS_RATE]->(rate) RETURN m"
  db.cypherQuery(query, params, function(err, result){
    if(err) throw err;
    // console.log("neo----", result.data);
    cb(result.data)
  });
}

exports.makeStorage = function(req, res){
  // doNeoStore(yelpObj, factualObj, function(data){
  //   res.json(200, data)
  //
  // })
  factual.get('/t/places/', {q:'steak', geo:{"$circle":{"$center":[37.7929386536957, -122.3923764021],"$meters":5000}}},
    function(err, results){
      _(results.data).forEach(function(item){
        yelp.search({term: item.name, location: item.locality}, function(err, yelpBus){
          if(yelpBus.businesses.length){
            console.log(yelpBus);
            res.json(200, yelpBus)
            doNeoStore(yelpBus.businesses[0], function(data){
              res.json(200, data)

            })
          }
        })
      })
    })

}


var factualObj = { address: '500 California St',
  category_ids: [ 365, 348, 364 ],
  category_labels:
   [ [ 'Social', 'Food and Dining', 'Restaurants', 'Steakhouses' ],
     [ 'Social', 'Food and Dining', 'Restaurants', 'American' ],
     [ 'Social', 'Food and Dining', 'Restaurants', 'Seafood' ] ],
  country: 'us',
  email: 'j.frederick@bobs-steakandchop.com',
  factual_id: '2de89d65-853c-4125-8da3-c89f164d17c9',
  fax: '(415) 273-3038',
  hours:
   { monday: [ [Object], [Object], [Object] ],
     tuesday: [ [Object], [Object], [Object] ],
     wednesday: [ [Object], [Object], [Object] ],
     thursday: [ [Object], [Object], [Object] ],
     friday: [ [Object], [Object], [Object] ],
     saturday: [ [Object], [Object] ],
     sunday: [ [Object], [Object] ] },
  hours_display: 'Mon-Fri 6:30 AM-10:00 AM, 11:30 AM-2:00 PM, 5:30 PM-10:00 PM; Sat-Sun 7:00 AM-11:00 AM, 5:30 PM-10:00 PM',
  latitude: 37.793028,
  locality: 'San Francisco',
  longitude: -122.403078,
  name: 'Bob\'s Steak and Chophouse',
  neighborhood:
   [ 'Financial District',
     'Financial District / Embarcadero',
     'Northeast',
     'Union Square',
     'Chinatown',
     'French Quarter',
     'Jackson Square',
     'Little Italy',
     'Downtown',
     'downtownwaterfront',
     'NOMA' ],
  postcode: '94104',
  region: 'CA',
  tel: '(415) 273-3085',
  website: 'http://www.bobs-steakandchop.com',
  '$distance': 940.3986 }

var yelpObj = { is_claimed: false,
  rating: 3.5,
  // mobile_url: 'http://m.yelp.com/biz/bobs-steak-and-chop-house-san-francisco',
  // rating_img_url: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png',
  review_count: 402,
  // name: 'Bob\'s Steak and Chop House',
  // snippet_image_url: 'http://s3-media4.fl.yelpcdn.com/photo/Q_dp-1USw38YGPpmJrzx3Q/ms.jpg',
  // rating_img_url_small: 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png',
  // url: 'http://www.yelp.com/biz/bobs-steak-and-chop-house-san-francisco',
  // menu_date_updated: 1387610831,
  // phone: '4152733085',
  snippet_text: 'A good US prime Steakhouse located in the downtown area at the Omni Hotel.\n\nService was very attentive, price is in line with other US Prime steak houses, I...',
  image_url: 'http://s3-media1.fl.yelpcdn.com/bphoto/MRC76wZssoSyNAQnBEZHOA/ms.jpg',
  categories: [ [ 'Steakhouses', 'steak' ] ],
  // display_phone: '+1-415-273-3085',
  // rating_img_url_large: 'http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png',
  // menu_provider: 'single_platform',
  id: 'bobs-steak-and-chop-house-san-francisco',
  // is_closed: false,
  location:
   {
     cross_streets: 'Montgomery St & Spring St',
    //  city: 'San Francisco',
    //  display_address:
      // [ '500 California St',
        // 'Financial District',
        // 'San Francisco, CA 94104' ],
     neighborhoods: [ 'Financial District' ],
    //  postal_code: '94104',
    //  country_code: 'US',
    //  address: [ '500 California St' ],
    //  state_code: 'CA'
    }
}
