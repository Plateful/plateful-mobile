CREATE (b:Business {
  yelp_id: {bus.id},
  name: {bus.name},
  phone: {bus.phone},
  display_phone: {bus.display_phone},
  image_url: {bus.image_url},
  street: {bus.location.cross_streets},
  address: [bus.location.address],
  city: {bus.location.city},
  postal_code: {bus.location.postal_code},
  country_code: {bus.location.country_code},
  state_code: {bus.location.state_code}
}),
(menu:Menu { score:4.82 , name:{bus.name}}),
(i:Item {name: {bus.name}, rating: {bus.rating}, review_count: {bus.review_count}, likes: 10,
  top_image_url: {bus.image_url}
}),
(rev:Review {
  review_text: {bus.snippet_text},
  down: 5,
  up: {bus.review_count}
}),
(p:Photo {
  image_url: {bus.image_url},
  likes: {bus.review_count},
  is_top: true
}),
(b)-[:HAS_MENU]->(menu),
(menu)-[:BELONGS_TO]->(b),
(menu)-[:HAS_ITEM]->(I),
(i)-[:FROM_MENU]->(menu),
(i)-[:HAS_PHOTO]->(p),
(i)-[:HAS_REVIEW]->(rev),
(rev)-[:OF_ITEM]->(i),
(rev)-[:HAS_PHOTO]->(p),
(p)-[:FROM_REVIEW]->(rev),
(p)-[:OF_ITEM]->(i),
match (u:User {name: "Joel Cox"}),
(p)-[:BY]->(u),
(u)-[:TOOK_PHOTO]->(p),
(u)-[:MADE_REVIEW]->(rev),
(u)-[:HAS_COLLECTED]->(i)
RETURN u,i,rev,p,menu

//
// { is_claimed: false,
//   rating: 2,
//   mobile_url: 'http://m.yelp.com/biz/fish-and-chips-and-chicken-stop-and-soul-food-oakland',
//   rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/b561c24f8341/ico/stars/v1/stars_2.png',
//   review_count: 1,
//   name: 'Fish & Chips & Chicken Stop & Soul Food',
//   snippet_image_url: 'http://s3-media2.fl.yelpcdn.com/photo/Tx8oXPMPyGdIqq20HRbKxA/ms.jpg',
//   rating_img_url_small: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a6210baec261/ico/stars/v1/stars_small_2.png',
//   url: 'http://www.yelp.com/biz/fish-and-chips-and-chicken-stop-and-soul-food-oakland',
//   phone: '5109695267',
//   snippet_text: 'i received a pm from the new owner stating he had taken over and they\'ve added soul food. the place looks the same and a very young cashier (son) is...',
//   image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/uRQq39Hzd83MvUuXlRD3sw/ms.jpg',
//   categories:
//    [ [ 'Cajun/Creole', 'cajun' ],
//      [ 'Soul Food', 'soulfood' ],
//      [ 'Fish & Chips', 'fishnchips' ] ],
//   display_phone: '+1-510-969-5267',
//   rating_img_url_large: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c00926ee5dcb/ico/stars/v1/stars_large_2.png',
//   id: 'fish-and-chips-and-chicken-stop-and-soul-food-oakland',
//   is_closed: false,
//   location:
//    { cross_streets: '89th Ave & 90th Ave',
//      city: 'Oakland',
//      display_address: [ '8929 MacArthur Blvd', 'East Oakland', 'Oakland, CA 94605' ],
//      neighborhoods: [ 'East Oakland' ],
//      postal_code: '94605',
//      country_code: 'US',
//      address: [ '8929 MacArthur Blvd' ],
//      state_code: 'CA' } }
//
//   // mobile_url: 'http://m.yelp.com/biz/fish-and-chips-and-chicken-stop-and-soul-food-oakland',
//   // rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/b561c24f8341/ico/stars/v1/stars_2.png',
// CREATE (u:User {name: "Joel Cox"}),
// (b:Business {
//   yelp_id: 'fish-and-chips-and-chicken-stop-and-soul-food-oakland',
//   name: 'Fish & Chips & Chicken Stop & Soul Food',
//   phone: '5109695267',
//   display_phone: '+1-510-969-5267',
//   image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/uRQq39Hzd83MvUuXlRD3sw/ms.jpg',
//   categories:
//    [ [ 'Cajun/Creole', 'cajun' ],
//      [ 'Soul Food', 'soulfood' ],
//      [ 'Fish & Chips', 'fishnchips' ] ],
//   location:
//    { street: '89th Ave & 90th Ave',
//      address: [ '8929 MacArthur Blvd' ],
//      city: 'Oakland',
//      postal_code: '94605',
//      country_code: 'US',
//      state_code: 'CA' }
//      display_address: [ '8929 MacArthur Blvd', 'East Oakland', 'Oakland, CA 94605' ],
//      neighborhoods: [ 'East Oakland' ]
// }),
// (menu:Menu   { score:4.82 , name:"Fish & Chips & Chicken Stop & Soul Food" , lon:-122.4167, lat:37.7833 }),
// (i:Item {name: "Fish Dinner", rating: 2, review_count: 1, likes: 2034,
//   top_image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/uRQq39Hzd83MvUuXlRD3sw/ms.jpg'
// }),
// (rev:Review {
//   review_text: 'i received a pm from the new owner stating he had taken over and they\'ve added soul food. the place looks the same and a very young cashier (son) is...',
//   down: 100,
//   up: 0
// }),
// (p:Photo {
//   image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/uRQq39Hzd83MvUuXlRD3sw/ms.jpg',
//   likes: 4000,
//   is_top: true
// }),
// (b)-[:HAS_MENU]->(menu),
// (menu)-[:BELONGS_TO]->(b),
// (menu)-[:HAS_ITEM]->(I),
// (i)-[:FROM_MENU]->(menu),
// (i)-(:HAS_PHOTO)->(p),
// (i)-[:HAS_REVIEW]->(rev),
// (rev)-[:OF_ITEM]->(i),
// (rev)-[:HAS_PHOTO]->(p),
// (p)-[:FROM_REVIEW]->(rev),
// (p)-[:OF_ITEM]->(i),
// (p)-[:BY]->(u),
// (u)-[:TOOK_PHOTO]->(p),
// (u)-[:MADE_REVIEW]->(rev),
// (u)-[:HAS_COLLECTED]->(i);
//
//
// MATCH (n)
// OPTIONAL MATCH (n)-[r]-()
// DELETE n,r
//
// // review_count: 1,
//
// // ( blowfish:Menu  { score:4.38 , name:"Blowfish Sushi"          , lon:-122.4167, lat:37.7833 }),
// // ( patala:Menu    { score:3.61 , name:"Patala Cafe"             , lon:-122.4167, lat:37.7833 }),
// // ( frenchys:Menu  { score:1.19 , name:"Frenchy's Joint"         , lon:-122.4167, lat:37.7833 }),
//
// //



// =========================== USER MATCHING query

// match (u:User {name: "Joel Cox"}),(rev:Review),(p:Photo),(i:Item)
// create (u)-[:MADE_REVIEW]->(rev),(u)-[:TOOK_PHOTO]->(p),(u)-[:COLLECTED]->(i),(u)-[:REVIEWED]->(i)
// RETURN u

// =========================== YELP SCHEMA
//
yelp.search({location: "yelp-san-francisco"}, function(error, data) {
  if(error) return handleError(res, error)

    _(data.businesses).forEach(function(bus){
      db.cypherQuery(
        "CREATE (m:Menu {"+
         "yelp_id: '"+bus.id+"',"+
         "name: '"+bus.name+" YOLO',"+
         "phone: '"+bus.phone+"',"+
         "display_phone: '"+bus.display_phone+"',"+
         "image_url: '"+bus.image_url+"',"+
         "street: '"+bus.location.cross_streets+"',"+
         "address: '"+bus.location.address[0]+"',"+
         "city: '"+bus.location.city+"',"+
         "postal_code: '"+bus.location.postal_code+"',"+
         "country_code: '"+bus.location.country_code+"',"+
         "state_code: '"+bus.location.state_code+"'"+
        "}),"+
        // "(menu:Menu { score:4.82, name:'"+bus.name+"'}),"+
        "(i1:Item {name: '"+bus.name+"', rating: '"+bus.rating+"', review_count: '"+bus.review_count+"', likes: 10, top_image_url: '"+bus.image_url+"' }),"+
        "(r1:Review {created_at: timestamp()}),"+
        "(e1:Essay {review_text: '"+bus.snippet_text+"', down: 5, up: '"+bus.review_count+"'}),"+
        "(p1:Photo {"+
          "image_url: '"+bus.image_url+"',"+
          "likes: '"+bus.review_count+"',"+
          "is_top: true"+
        "}),"+
        "(rate1:Rating {value: '"+bus.rating+"'}),"+
        "(m)-[:HAS_ITEM]->(i1),"+
        "(r1)-[:REVIEW_OF]->(i1),"+
        "(r1)-[:HAS_ESSAY]->(e1),"+
        "(r1)-[:HAS_PHOTO]->(p1),"+
        "(r1)-[:HAS_RATE]->(rate1)",
        function(err, result){
            if(err) throw err;

            console.log(result.data); // delivers an array of query results
            console.log(result.columns); // delivers an array of names of objects getting returned
            // res.json(result.data)
            // res.json(200, result)
        });


    })
})
