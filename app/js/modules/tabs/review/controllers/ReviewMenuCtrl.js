(function() {
  var ReviewMenuCtrl = function($scope, Menu, BackgroundGeo) {
    var reviewMenu = this

    reviewMenu.locate = window.currLocation.coords;

    var LocationData = {
      lat: reviewMenu.locate.latitude,
      lng: reviewMenu.locate.longitude,
      dist: 1.0
    };

    Menu.getByLocation(LocationData, null)
      .then(function(data) {
        console.log(data)
        // item.dist = BackgroundGeo.distance(item.lat, item.lon)
        reviewMenu.menus = data;
        _.each(reviewMenu.menus, function(item) {
          item.dist = BackgroundGeo.distance(item.latitude, item.longitude);
          console.log(item.dist);
        })
        console.log('u',reviewMenu.menus);
      });

    reviewMenu.newSearch = newSearch;

    function newSearch(nearbyFilter) {

      var menuFilter = menuFilter || "empty";

      Menu.getByLocation(LocationData, nearbyFilter)
        .then(function(data) {
          reviewMenu.menus = data;
        });
    };
  };

  ReviewMenuCtrl
    .$inject = ['$scope', 'Menu', 'BackgroundGeo'];
  angular
    .module('app.modules.tabs.review.controllers', [])
    .controller('ReviewMenuCtrl', ReviewMenuCtrl);
})();
