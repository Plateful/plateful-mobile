// (function() {
//   /*
//    * @name   MenusCtrl
//    * @desc   Controller for the menus tab
//    *         Start off the google search by looking up businesses within our current location
//    * @test1  test to see if @locations has data
//    * @test2  test to see if @locate is equal to our current longitude and latitude
//    */
//   var holdMenusCtrl = function($scope, Menu, $timeout, $document, ngGPlacesAPI) {
//     var vm = this
//     var geocoder = new google.maps.Geocoder()
//     vm.locate = window.currLocation.coords;
//     results = []
//     Menu
//       .get()
//       .then(function (data){
//         var i = 0
//         var count = 0
//         doGeo(data[1])
//         // setInterval(function(){
//         //   if(!data[i].place_id && data[i]){
//         //     console.log(data[i]);
//         //     console.log(count);
//         //     count++
//         //     doGeo(data[i])
//         //     if(i > data.length) return
//         //   }
//         //   i++
//         // }, 500)
//
//         // for(var i = 0; i < data.length; i++){
//         //   if(data[i].name === "Bob's Steak and Chop House"){
//         //     doGeo(data[i])
//         //   }
//         //     // results.push(data[i])
//         // }
//         // }
//         // console.log(data);
//       })
//
//     vm.searchEventTimeout = void 0;
//
//     vm.searchInputElement = angular.element($document.find('#searchQuery'));
//
//     vm.searchQuery = {
//       vicinity: 'San Francisco',
//       // reference: "Cliffs house",
//       latitude: vm.locate.latitude,
//       longitude: vm.locate.longitude
//     };
//
//     googleSearch(vm.searchQuery)
//
//       .then(function(data) {
//
//         console.log(data);
//
//         vm.locations = data;
//
//       });
//
//     /////////////////////
//
//     function doGeo(query){
//       // geocoder.geocode({ address: query.address }, function(results, status){
//         console.log(results);
//       // console.log(query.name)
//         var str = query.address.replace(/ San Francisco$/i, "")
//         query.address = str
//         // var str2 = query.address.split("San Francisco")[0]
//         // console.log(str);
//         gQuery = {
//           nearbySearchKeys: ['geometry'],
//           // keyword: query.address,
//           name: query.name,
//           reference: query.name,
//           // name: "Uncle Vito's",
//           // reference: 'Uncle Vito\'s',
//           // vicinity: query.city,
//           latitude: vm.locate.latitude,
//           longitude:vm.locate.longitude,
//           // radius:20000,
//           // name: query,
//           // latitude: results[0].geometry.location.k,
//           // longitude: results[0].geometry.location.B
//         };
//         console.log(gQuery);
//           // var gQuery = {reference: results.formatted_address}
//         googleSearch(gQuery)
//           .then(function(data){
//             query.place_id = data[0].place_id
//
//             // Menu.update(query._id, query)
//             query.lat = data[0].geometry.location.k
//             query.lng = data[0].geometry.location.B
//             // query.put()
//             console.log(query);
//             console.log("Google", data);
//           })
//           .catch(function(msg){
//             console.log("Error", msg);
//           })
//       // })
//       //   if (status === google.maps.GeocoderStatus.OK){
//       //     console.log(status);
//       //   }else{
//       //  // @TODO: Figure out what to do when the geocoding fails
//       //   }
//       // })
//     }
//
//     function googleSearch(query){
//       return ngGPlacesAPI.nearbySearch(query);
//     };
//
//   };
//
//   MenusCtrl
//     .$inject = ['$scope', 'Menu', '$timeout', '$document', 'ngGPlacesAPI'];
//   angular
//     .module('app.modules.tabs.menus.controllers')
//     .controller('holdMenusCtrl', holdMenusCtrl);
// })();
