(function() {
  var ReviewMenuCtrl = function($scope, Menu, BackgroundGeo, reviewMenuInit, locationData) {
    var reviewMenu = this
    var LocationData = locationData;
    reviewMenu.menus = reviewMenuInit;

    /*** CONTROLLER METHODS ***/
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
    .$inject = ['$scope', 'Menu', 'BackgroundGeo', 'reviewMenuInit', 'locationData'];
  angular
    .module('app.modules.tabs.review.controllers', [])
    .controller('ReviewMenuCtrl', ReviewMenuCtrl);
})();
