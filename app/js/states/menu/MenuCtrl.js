(function() {
  var addItemCtrl;
  var MenuCtrl = function($rootScope, $scope, $stateParams, Menu, MenuItem, $ionicModal, $ionicLoading, $compile, Auth, ngGPlacesAPI, BackgroundGeo) {

    var vm = this;

    vm.menu_id = $stateParams.menu_id;
    vm.closeModal     = closeModal;
    vm.openModal      = openModal;
    vm.login          = login;
    vm.addNewItem     = addNewItem;
    vm.placeDetails   = placeDetails;

    getMenu()
    getMenuItems()
    initializeIonicModal()


    /////////////////


    function getMenu(){

      placeDetails()
        .then(function(data){
          console.log(data);
          vm.menu = data;
          vm.menu.distance = BackgroundGeo.distance(vm.menu.geometry.location.k, vm.menu.geometry.location.B);
          console.log(vm.menu.distance);
        })
        .catch(function(err){
          console.log(err);
        });

    }

    function getMenuItems(){

      Menu
        .getMenuItems(vm.menu_id)
        .then(function(data){
          vm.items = data;
          console.log(data);
        })
        .catch(function(err){
          console.log(err);
        });

    }

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
    'BackgroundGeo'
  ];
  angular
    .module('app.states.menu')
    .controller('MenuCtrl', MenuCtrl)
    .controller('addItemCtrl', addItemCtrl);
})();
