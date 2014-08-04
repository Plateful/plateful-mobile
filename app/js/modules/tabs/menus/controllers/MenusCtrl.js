(function() {
  (function() {

    /*
     * @name   MenusCtrl
     * @desc   Controller for the menus tab
     *         Start off the google search by looking up businesses within our current location
     * @test1  test to see if @locations has data
     * @test2  test to see if @locate is equal to our current longitude and latitude
     */
    var MenusCtrl;
    MenusCtrl = function($scope, Menu, $timeout, $document, ngGPlacesAPI) {
      var googleSearch;
      this.initialize = (function(_this) {
        return function() {
          _this.locate = window.currLocation.coords;
          _this.searchEventTimeout = void 0;
          _this.searchInputElement = angular.element($document.find('#searchQuery'));
          _this.searchQuery = {
            vicinity: 'San Francisco',
            latitude: _this.locate.latitude,
            longitude: _this.locate.longitude
          };
          return googleSearch(_this.searchQuery).then(function(data) {
            console.log(data);
            _this.locations = data;
          });
        };
      })(this);
      googleSearch = function(query) {
        return ngGPlacesAPI.nearbySearch(query);
      };
      this.initialize();
    };
    MenusCtrl.$inject = ['$scope', 'Menu', '$timeout', '$document', 'ngGPlacesAPI'];
    return angular.module('app.modules.tabs.menus.controllers', []).controller('MenusCtrl', MenusCtrl);
  })();

}).call(this);
