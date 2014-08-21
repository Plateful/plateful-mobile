(function() {
  var ItemsCtrl = function($scope, $ionicModal, MenuItem, Menu, ImagesService, $q, BackgroundGeo, findDistance, makeStars, ItemMapService, MakeMap) {

    var vm,map,service,infowindow;

    vm = this;
    vm.images = ImagesService.get();
    vm.querySearch = querySearch;
    vm.closeModal = closeModal;
    vm.openModal = openModal;
    vm.storeItemForMap = storeItemForMap;

    BackgroundGeo
      .current()
      .then(function(data){

        vm.lat = data.latitude;
        vm.long = data.longitude;

        getMenuItems(null)
          .then(function(data) {
            console.log(data);
            vm.items = data;
            _.each(vm.items, function ( item, index ){
              item.dist = BackgroundGeo.distance(item.lat, item.lon);
            });
          });
      });



    $ionicModal.fromTemplateUrl("js/tabs/items/modals/filterModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function($ionicModal) {
      vm.filterModal = $ionicModal;
    });

    //////////////////



    function getMenuItems(filter){
      console.log("from controller", vm.lat);
      return MenuItem.getByLocation({
        lat:vm.lat,
        lng:vm.long,
        dist: 1.0
      }, null);
      // return MenuItem.get()

    }

    function querySearch(itemsFilter){

      itemsFilter = itemsFilter || "empty";

      // getMenuItems(itemsFilter)

      //   .then(function(data) {

      //     vm.items = newData;

      //   });
    }

    function openModal(){

      vm.filterModal.show();

    }
    function closeModal(){

      vm.filterModal.hide();

    }
    function storeItemForMap(item){
      ItemMapService.set(item._id, item);
    }
  };



  ItemsCtrl
    .$inject = ["$scope", "$ionicModal", "MenuItem", "Menu", "ImagesService", "$q", "BackgroundGeo", "findDistance", "makeStars", "ItemMapService"];

  angular
    .module("app.tabs.items")
    .controller("ItemsCtrl", ItemsCtrl);

})();
