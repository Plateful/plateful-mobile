(function() {
  var ReviewMenuCtrl = function($scope, Menu) {
    var reviewMenu = this

    reviewMenu.locate = window.currLocation.coords;

    LocationData = {
      lat: reviewMenu.locate.latitude,
      lng: reviewMenu.locate.longitude
    };
    console.log('000', LocationData)

    Menu.getByLocation(LocationData, null)
      .then(function(data) {
        reviewMenu.menus = data;
      });

    reviewMenu.newSearch = newSearch

    function newSearch(nearbyFilter) {

      var menuFilter = menuFilter || "empty";

      Menu.getByLocation(LocationData, nearbyFilter)
        .then(function(data) {
          reviewMenu.menus = data;
        });
    };
  };

  ReviewMenuCtrl
    .$inject = ['$scope', 'Menu'];
  angular
    .module('app.modules.tabs.review.controllers', [])
    .controller('ReviewMenuCtrl', ReviewMenuCtrl);
})();
