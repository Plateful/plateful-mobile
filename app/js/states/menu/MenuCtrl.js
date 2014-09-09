(function() {
  var addItemCtrl;
  var MenuCtrl = function($rootScope, $scope, $stateParams, Menu, MenuItem, $ionicModal, $ionicLoading, $compile, Auth, ngGPlacesAPI, BackgroundGeo, menuInit, menuItemsInit) {

    var vm = this;

    vm.menu_id        = $stateParams.menu_id;
    vm.menu           = menuInit;
    vm.menu.distance  = BackgroundGeo.distance(vm.menu.latitude, vm.menu.longitude);
    vm.items          = menuItemsInit;
    vm.closeModal     = closeModal;
    vm.openModal      = openModal;
    vm.login          = login;
    vm.addNewItem     = addNewItem;
    vm.placeDetails   = placeDetails;

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
    '$rootScope',
    '$scope',
    '$stateParams',
    'Menu',
    'MenuItem',
    '$ionicModal',
    '$ionicLoading',
    '$compile',
    'Auth',
    'ngGPlacesAPI',
    'BackgroundGeo',
    'menuInit',
    'menuItemsInit'
  ];
  angular
    .module('app.states.menu')
    .controller('MenuCtrl', MenuCtrl)
    .controller('addItemCtrl', addItemCtrl);
})();
