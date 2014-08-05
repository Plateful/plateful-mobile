(function() {
  var ItemsCtrl = function($scope, $ionicModal, MenuItem, Menu, ImagesService) {

    var vm = this

    vm.locate = window.currLocation.coords;
    vm.images = ImagesService.get();
    vm.querySearch = querySearch;
    vm.closeModal = closeModal;
    vm.openModal = openModal;

    vm.locationData = {lat: vm.locate.latitude, lng: vm.locate.longitude };

    getMenuItems(null)

      .then(function(data) {

        vm.items = data;

      });

    //////////////////

    function getMenuItems(filter){

      return MenuItem.getByLocation(vm.locationData, null);

    }
    function querySearch(itemsFilter){

      itemsFilter = itemsFilter || "empty";

      getMenuItems(itemsFilter)

        .then(function(data) {

          vm.items = newData;

        });
    }
    function initializeModal(){

      $ionicModal.fromTemplateUrl("js/modules/tabs/find/modals/filterModal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        vm.filterModal = modal;
      });
    }
    function openModal(){

      vm.filterModal.show();

    }
    function closeModal(){

      vm.filterModal.hide();

    }
  };
  ItemsCtrl
    .$inject = ["$scope", "$ionicModal", "MenuItem", "Menu", "ImagesService"];
  angular
    .module("app")
    .controller("ItemsCtrl", ItemsCtrl);
})();
