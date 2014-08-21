(function() {
  /*
   * @name   MenusCtrl
   * @desc   Controller for the menus tab
   *         Start off the google search by looking up businesses within our current location
   * @test1  test to see if @locations has data
   * @test2  test to see if @locate is equal to our current longitude and latitude
   */
  var MenusCtrl = function(resolvedMenuData, $scope, $document, ngGPlacesAPI) {

    var vm = this;

    vm.locations = resolvedMenuData;

    vm.searchEventTimeout = void 0;
    vm.searchInputElement = angular.element($document.find('#searchQuery'));


    /////////////////////


    function googleSearch(query){
      return ngGPlacesAPI.nearbySearch(query);
    }

  };

  MenusCtrl
    .$inject = [
      'resolvedMenuData',
      '$scope',
      '$document',
      'ngGPlacesAPI'
    ];
  angular
    .module('app.tabs.menus.controllers', [])
    .controller('MenusCtrl', MenusCtrl);
})();
