(function() {
  /*
   * @name   MenusCtrl
   * @desc   Controller for the menus tab
   *         Start off the google search by looking up businesses within our current location
   * @test1  test to see if @locations has data
   * @test2  test to see if @locate is equal to our current longitude and latitude
   */
  var MenusCtrl = function($scope, Menu, $timeout, $document, ngGPlacesAPI, BackgroundGeo) {

    var vm = this;

    BackgroundGeo
      .current()
      .then(function(data){

        vm.locate = data;

        vm.searchQuery = {
          vicinity: 'San Francisco',
          // reference: "Cliffs house",
          latitude: vm.locate.latitude,
          longitude: vm.locate.longitude
        };

        googleSearch(vm.searchQuery)
          .then(function(data) {
            console.log(data);
            vm.locations = data;
          });
      })

    vm.searchEventTimeout = void 0;

    vm.searchInputElement = angular.element($document.find('#searchQuery'));


    /////////////////////

    function googleSearch(query){
      return ngGPlacesAPI.nearbySearch(query);
    }

  };

  MenusCtrl
    .$inject = ['$scope', 'Menu', '$timeout', '$document', 'ngGPlacesAPI', 'BackgroundGeo'];
  angular
    .module('app.modules.tabs.menus.controllers', [])
    .controller('MenusCtrl', MenusCtrl);
})();
