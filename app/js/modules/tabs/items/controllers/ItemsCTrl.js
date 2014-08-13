(function() {
  var ItemsCtrl = function($scope, $ionicModal, MenuItem, Menu, ImagesService, $q, BackgroundGeo, findDistance, makeStars, ItemMapService, MakeMap) {


    var vm,map,service,infowindow;

    vm = this

    BackgroundGeo
      .current()
      .then(function(data){
        // vm.pyrmont = new google.maps.LatLng(data.latitude,data.longitude);
        // initialize(data.latitude, data.longitude)
        vm.lat = data.latitude
        vm.long = data.longitude
        getMenuItems(null)
          // MenuItem.get()
          .then(function(data) {
            console.log(data);
            vm.items = data;
            _.each(vm.items, function ( item, index ){
              item.dist = BackgroundGeo.distance(item.menu.latitude, item.menu.longitude)
            });

          });
      })



    // vm.locate = window.currLocation.coords
    vm.images = ImagesService.get();
    vm.querySearch = querySearch;
    vm.closeModal = closeModal;
    vm.openModal = openModal;
    vm.storeItemForMap = storeItemForMap


    $ionicModal.fromTemplateUrl("js/modules/tabs/items/modals/filterModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function($ionicModal) {
      vm.filterModal = $ionicModal;
    });

    //////////////////


    function getMenuItems(filter){

      // return MenuItem.getByLocation(vm.locationData, null);
      return MenuItem.get()

    }

    function querySearch(itemsFilter){

      itemsFilter = itemsFilter || "empty";

      getMenuItems(itemsFilter)

        .then(function(data) {

          vm.items = newData;

        });
    }

    function openModal(){

      vm.filterModal.show();

    }
    function closeModal(){

      vm.filterModal.hide();

    }
    function storeItemForMap(item){
      ItemMapService.set(item._id, item)
    }
  };



  ItemsCtrl
    .$inject = ["$scope", "$ionicModal", "MenuItem", "Menu", "ImagesService", "$q", "BackgroundGeo", "findDistance", "makeStars", "ItemMapService"];

  angular
    .module("app")
    .controller("ItemsCtrl", ItemsCtrl)
    .factory("MakeMap", MakeMap);
})();
