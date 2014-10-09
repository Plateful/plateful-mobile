(function() {
  var addItemCtrl;
  var MenuCtrl = function($scope, $stateParams, Menu, $ionicModal, $compile, Auth, ngGPlacesAPI, BackgroundGeo, menuInit, menuItemsInit, $sce) {

    var vm = this;
    var escapedAddress;


    vm.menu_id        = $stateParams.menu_id;
    vm.menu           = menuInit;
    vm.menu.distance  = BackgroundGeo.distance(vm.menu.latitude, vm.menu.longitude);
    vm.items          = menuItemsInit;
    vm.closeModal     = closeModal;
    vm.openModal      = openModal;
    vm.login          = login;
    vm.addNewItem     = addNewItem;
    vm.placeDetails   = placeDetails;

    escapedAddress    = [vm.menu.address,vm.menu.city,vm.menu.state].join(',').replace(/\s/g, '+')
    vm.placeUrl       = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place"+
                                                "?key=AIzaSyBHB-4XsqFcIYYhid36PjMj5YJwkiFYy7Y"+
                                                "&q="+escapedAddress+
                                                "&zoom=15");

    initializeIonicModal()


    /////////////////


    function initializeIonicModal(){
      $ionicModal
        .fromTemplateUrl('js/states/menu/modals/createItemModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function(modal) {
          vm.createModal = modal;
        });
    }

    function openModal(){

      vm.createModal.show();
    }
    function closeModal(){
      vm.createModal.hide();
    }
    function addNewItem(item){

    }
    function login(){
      Auth.setAuthToken( vm.username, vm.password );
    }
    function placeDetails(){
      log("id", vm.menu_id);
      return ngGPlacesAPI.placeDetails({placeId: vm.menu_id});
    }

  };

  MenuCtrl.$inject = [
    '$scope',
    '$stateParams',
    'Menu',
    '$ionicModal',
    '$compile',
    'Auth',
    'ngGPlacesAPI',
    'BackgroundGeo',
    'menuInit',
    'menuItemsInit',
    '$sce'
  ];
  angular
    .module('app.states.menu')
    .controller('MenuCtrl', MenuCtrl)
    .controller('addItemCtrl', addItemCtrl);
})();
