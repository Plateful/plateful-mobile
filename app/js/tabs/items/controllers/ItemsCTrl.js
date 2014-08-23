(function() {
  var ItemsCtrl = function(resolvedData, $scope, $ionicModal, MenuItem, Menu, $q, BackgroundGeo, findDistance, makeStars, ItemMapService, MakeMap) {


    var vm,map,service,infowindow;

    vm = this;
    vm.items = resolvedData
    vm.querySearch = querySearch;
    vm.closeModal = closeModal;
    vm.openModal = openModal;
    vm.storeItemForMap = storeItemForMap;


    $ionicModal.fromTemplateUrl("js/tabs/items/modals/filterModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function($ionicModal) {
      vm.filterModal = $ionicModal;
    });


    //////////////////



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
    .$inject = [
      "resolvedData",
      "$scope",
      "$ionicModal",
      "MenuItem",
      "Menu",
      "$q",
      "BackgroundGeo",
      "findDistance",
      "makeStars",
      "ItemMapService"
    ];

  angular
    .module("app.tabs.items")
    .controller("ItemsCtrl", ItemsCtrl);

})();
