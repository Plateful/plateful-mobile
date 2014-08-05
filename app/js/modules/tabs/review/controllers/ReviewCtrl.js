(function() {
  var ReviewCtrl = function($scope, CreateReview, Menu) {
    var vm = this

    vm.locate = window.currLocation.coords;

    LocationData = {
      lat: vm.locate.latitude,
      lng: vm.locate.longitude
    };

    Menu
      .getByLocation(LocationData, null)
      .then(function(data) {
        vm.menus = data;
      });

    vm.newSearch = newSearch

    function newSearch(nearbyFilter) {

      var menuFilter = menuFilter || "empty";

      Menu
        .getByLocation(LocationData, nearbyFilter)
        .then(function(data) {

          vm.menus = data;

        });
    };
  };

  ReviewCtrl
    .$inject = ['$scope', 'CreateReview', 'Menu'];
  angular
    .module('app.modules.tabs.review.controllers', [])
    .controller('ReviewCtrl', ReviewCtrl);
})();
