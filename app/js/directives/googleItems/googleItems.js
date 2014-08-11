// (function() {
//
//     var googleItems = function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $document, ngGPlacesAPI, MenusData){
//       return {
//         require: '?ngModel',
//         restrict: 'E',
//         template: '<input type="text" readonly="readonly" class="ion-google-place" autocomplete="off">',
//         replace: true,
//         link: function(scope, element, attrs, ngModel) {
//           var POPUP_TPL, geocoder, popupPromise, searchEventTimeout;
//           scope.locations = [];
//           scope.locate = window.currLocation.coords;
//           geocoder = new google.maps.Geocoder();
//           searchEventTimeout = void 0;
//           POPUP_TPL = ['<div class="ion-google-place-container">', '<div class="bar bar-header bar-positive item-input-inset">', '<label class="item-input-wrapper">', '<i class="icon ion-ios7-search placeholder-icon"></i>', '<input id="searchQuery" class="google-place-search" type="search" ng-model="searchQuery" placeholder="Enter an address, place or ZIP code">', '</label>', '<button class="button button-clear">', 'Cancel', '</button>', '</div>', '<ion-content class="has-header has-header">', '<ion-list>', '<ion-item ng-repeat="location in items" type="item-text-wrap" ng-click="selectLocation(location)">', '<h2>{{location.name}}</h2>', '</ion-item>', '</ion-list>', '</ion-content>', '</div>'].join('');
//           popupPromise = $ionicTemplateLoader.compile({
//             template: POPUP_TPL,
//             scope: scope,
//             appendTo: $document[0].body
//           });
//           var pyrmont = new google.maps.LatLng(scope.locate.latitude,scope.locate.longitude);
//
//           map = new google.maps.Map(document.getElementById('map'), {
//               center: pyrmont,
//               zoom: 15
//             });
//
//
//           popupPromise.then(function(el) {
//             var onCancel, onClick, searchInputElement;
//             searchInputElement = angular.element(el.element.find('input'));
//             scope.selectLocation = function(location) {
//               ngModel.$setViewValue(location);
//               ngModel.$render();
//               el.element.css('display', 'none');
//               return $ionicBackdrop.release();
//             };
//             scope.$watch('searchQuery', function(query) {
//               if (searchEventTimeout) {
//                 $timeout.cancel(searchEventTimeout);
//               }
//               return searchEventTimeout = $timeout(function() {
//                 if (!query) {
//                   return;
//                 }
//
//                 var request = {
//                   query: query,
//                   location: pyrmont,
//                   radius: '500',
//                   types: ['food']
//                 };
//
//                 service = new google.maps.places.PlacesService(map);
//                 return service.textSearch(request, callback);
//
//                 function callback(results, status) {
//                   if (status == google.maps.places.PlacesServiceStatus.OK) {
//                     scope.items = results
//                     console.log(results);
//                     return scope.vm.items = results;
//                     // for (var i = 0; i < scope.vm.items.length; i++) {
//
//                       // scope.vm.items[i].dist = findDistance.get( scope.vm.items[i].geometry.location.k, scope.vm.items[i].geometry.location.B )
//                       // scope.items[i].stars = makeStars.get(scope.vm.items[i].rating)
//                       // createMarker(results[i]);
//                       // console.log(place);
//                     // }
//                   }
//                 }
//
//               //   return ngGPlacesAPI.nearbySearch({
//               //     nearbySearchKeys: ['geometry'],
//               //     name: query,
//               //     reference: query,
//               //     latitude: scope.locate.latitude,
//               //     longitude: scope.locate.longitude
//               //   }).then(function(data) {
//               //     MenusData.set(data);
//               //     console.log(data);
//               //     scope.locations = data;
//               //     return scope.vm.locations = data;
//               //   });
//               }, 350);
//             });
//             onClick = function(e) {
//               e.preventDefault();
//               e.stopPropagation();
//               $ionicBackdrop.retain();
//               el.element.css('display', 'block');
//               searchInputElement[0].focus();
//               return setTimeout(function() {
//                 return searchInputElement[0].focus();
//               }, 0);
//             };
//             onCancel = function(e) {
//               scope.searchQuery = '';
//               $ionicBackdrop.release();
//               return el.element.css('display', 'none');
//             };
//             element.bind('click', onClick);
//             element.bind('touchend', onClick);
//             return el.element.find('button').bind('click', onCancel);
//           });
//           if (attrs.placeholder) {
//             element.attr('placeholder', attrs.placeholder);
//           }
//           ngModel.$formatters.unshift(function(modelValue) {
//             if (!modelValue) {
//               return '';
//             }
//             return modelValue;
//           });
//           ngModel.$parsers.unshift(function(viewValue) {
//             return viewValue;
//           });
//           return ngModel.$render = function() {
//             if (!ngModel.$viewValue) {
//               return element.val('');
//             } else {
//               return element.val(ngModel.$viewValue.formatted_address || '');
//             }
//           };
//         }
//       };
//     }
//
//
// googleItems.$inject = ['$ionicTemplateLoader', '$ionicBackdrop', '$q', '$timeout', '$rootScope', '$document', 'ngGPlacesAPI', 'MenusData']
//
// angular
//   .module('googleItems', [])
//   .directive('googleItems', googleItems)
// }).call(this);
//
// //
// //
// // function initialize(lat, lng) {
// //   var pyrmont = new google.maps.LatLng(lat,lng);
// //
// //   map = new google.maps.Map(document.getElementById('map'), {
// //       center: pyrmont,
// //       zoom: 15
// //     });
// //
// //   var request = {
// //     query: "burgers",
// //     location: pyrmont,
// //     radius: '500',
// //     types: ['food']
// //   };
// //
// //   service = new google.maps.places.PlacesService(map);
// //   service.textSearch(request, callback);
// // }
// //
// // function callback(results, status) {
// //   if (status == google.maps.places.PlacesServiceStatus.OK) {
// //     vm.items = results;
// //     for (var i = 0; i < vm.items.length; i++) {
// //
// //       vm.items[i].dist = findDistance.get( vm.items[i].geometry.location.k, vm.items[i].geometry.location.B )
// //       vm.items[i].stars = makeStars.get(vm.items[i].rating)
// //       // createMarker(results[i]);
// //       // console.log(place);
// //     }
// //   }
// // }
