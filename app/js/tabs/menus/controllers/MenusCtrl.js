(function() {
  /*
   * @name   MenusCtrl
   * @desc   Controller for the menus tab
   *         Start off the google search by looking up businesses within our current location
   * @test1  test to see if @locations has data
   * @test2  test to see if @locate is equal to our current longitude and latitude
   */
  var MenusCtrl = function(resolvedMenuData, $scope, $document, ngGPlacesAPI, $location) {

    var vm = this;

    vm.locations = resolvedMenuData;

    vm.searchEventTimeout = void 0;
    vm.searchInputElement = angular.element($document.find('#searchQuery'));


    $scope.place = ""

    $scope.$watch('place', function(val){
      if(val.place_id){
        $location.path('/tab/menus/menu/' + val.place_id)
      }
    })
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
      'ngGPlacesAPI',
      '$location'
    ];
  angular
    .module('app.tabs.menus.controllers', [])
    .controller('MenusCtrl', MenusCtrl);
})();
