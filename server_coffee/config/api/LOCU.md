#
# locu new =
#
# bc529b42f30999730cbb731ce191f536186dc1f5
#
# var mclient = locu.MenuItemClient(KEY); // KEY is your API key, found on dev.locu.com
# mclient.search({name:'espresso', locality:'San Francisco'}, function(result){
# ... console.log(result.objects[0]);
# ... });





# { description: '',
#   id: 'c2a0ff8d200d0632cfa3a5786c9ccb272f955fe318ddc38191e22833774c929e',
#   name: 'Espresso\r',
#   price: 2.5,
#   resource_uri: '/v1_0/menu_item/c2a0ff8d200d0632cfa3a5786c9ccb272f955fe318ddc38191e22833774c929e/',
#   venue:
#    { categories: [ 'restaurant' ],
#      country: 'United States',
#      id: 'a8f7e3e4d0b0f1d85500',
#      lat: 37.796938,
#      locality: 'San Francisco',
#      long: -122.435926,
#      name: 'Gamine',
#      postal_code: '94123',
#      region: 'CA',
#      street_address: '2223 Union St.' } }

 var locu = require('locu');
my_api_key = 'foobar3foobar3'; // swap this out for your own
vclient = locu.VenueClient(my_api_key);
blue_bottle;
vclient.search({name:'Blue Bottle Coffee', locality: 'San Francisco'}, function(resposne){
... blue_bottle = response.objects[0];
});
blue_bottle;
{ categories: [ 'restaurant' ],
  country: 'United States',
  cuisines: [ 'coffee / tea' ],
  has_menu: true,
  id: 'd32b6888a6fbba7656c3',
  last_updated: '2012-09-05T06:00:37',
  lat: 37.782409,
  locality: 'San Francisco',
  long: -122.407711,
  name: 'Blue Bottle Coffee',
  postal_code: '94103',
  region: 'CA',
  resource_uri: '/v1_0/venue/d32b6888a6fbba7656c3/',
  street_address: '66 Mint St.',
  website_url: 'http://www.bluebottlecoffee.net/locations/mint-cafe/' }





locu = require('locu');
my_api_key = 'foobar3foobar3'; // swap this out for your own
menu_client = locu.MenuItemClient(my_api_key);
menu_client.search({ country: 'USA', name: 'burger', price__gte: 5, price__lt: 7}, function(r){
    console.log(r);
});

{ meta: { 'cache-expiry': 3600, limit: 100 },
  objects:
   [ { description: 'We do the grilling you do the Ketchup. Let us know if you like cheese.',
       id: 'a31e1d0e1296b198f7374d63b2da58d7110d87eb5f66d070491305953fc2aa4a',
       name: 'Kids Burger and Fries',
       price: 5,
       resource_uri: '/v1_0/menu_item/a31e1d0e1296b198f7374d63b2da58d7110d87eb5f66d070491305953fc2aa4a/',
       venue: [Object] },
     { description: 'Red Goat Goat cheese, roasted red peppers, walnuts, Vermont cheddar (sandwich only)',
       id: '8906a464d580768e1ac853d2299d3f17073a4b4c3d089695af0e1e72c32321a4',
       name: 'You are ìSoyî Going to Like it Burger',
       price: 6,
       resource_uri: '/v1_0/menu_item/8906a464d580768e1ac853d2299d3f17073a4b4c3d089695af0e1e72c32321a4/',
       venue: [Object] } ] }





locu = require('locu');
my_api_key = 'foobar3foobar3'; // swap this out for your own
vclient = locu.VenueClient(my_api_key);
vclient.insight('category', {location:[37.775, -122.4183]}, function(results){console.log(results);});
{ meta: { 'cache-expiry': 3600 },
  objects:
   { category:
      { 'beauty salon': 9.3265,
        gym: 0.9655,
        'hair care': 3.1513,
        laundry: 2.0796,
        other: 0.7321,
        restaurant: 39.8418,
        spa: 2.1008 } } }




locu = require('locu');
my_api_key = 'foobar3foobar3'; // swap this out for your own
vclient = locu.VenueClient(my_api_key);
vclient.insight('category', {location:[37.775, -122.4183]}, function(results){console.log(results);});
{ meta: { 'cache-expiry': 3600 },
  objects:
   { category:
      { 'beauty salon': 9.3265,
        gym: 0.9655,
        'hair care': 3.1513,
        laundry: 2.0796,
        other: 0.7321,
        restaurant: 39.8418,
        spa: 2.1008 } } }
