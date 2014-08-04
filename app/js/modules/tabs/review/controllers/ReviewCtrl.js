(function() {
  (function() {
    var ReviewCtrl;
    ReviewCtrl = function($scope, CreateReview, Menu) {
      var LocationData;
      this.locate = window.currLocation.coords;
      LocationData = {
        lat: this.locate.latitude,
        lng: this.locate.longitude
      };
      Menu.getByLocation(LocationData, null).then(function(data) {
        return this.menus = data;
      });
      this.newSearch = function(nearbyFilter) {
        var menuFilter;
        menuFilter = menuFilter || "empty";
        return Menu.getByLocation(LocationData, nearbyFilter).then(function(data) {
          return this.menus = data;
        });
      };
    };
    ReviewCtrl.$inject = ['$scope', 'CreateReview', 'Menu'];
    return angular.module('app.modules.tabs.review.controllers', []).controller('ReviewCtrl', ReviewCtrl);
  })();

}).call(this);
