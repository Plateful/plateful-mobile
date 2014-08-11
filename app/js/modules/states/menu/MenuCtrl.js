(function() {
  var addItemCtrl;
  var MenuCtrl = function($rootScope, $scope, $stateParams, Menu, MenuItem, $ionicModal, $ionicLoading, $compile, ImagesService, Auth, ngGPlacesAPI) {

    var vm = this;

    vm.locate = window.currLocation.coords;
    vm.menu_id = $stateParams.menu_id;
    vm.images = ImagesService.get();

    // Menu
    //   .find($scope.menu_id)
    //   .then(function(data) {
    //     var dist, from, to;
    //     vm.menu = data;
    //     from = new google.maps.LatLng(vm.locate.latitude, vm.locate.longitude);
    //     to = new google.maps.LatLng(data.lat, data.long);
    //     dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192;
    //     vm.menu.dist = dist - dist % 0.001;
    //   });

    $ionicModal
      .fromTemplateUrl('js/modules/states/menu/modals/createItemModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        vm.createModal = modal;
      });

    placeDetails()
      .then(function(data){
        console.log(data);
        vm.menu = data;
      })
      .catch(function(err){
        console.log(err);
      });

    vm.closeModal     = closeModal;
    vm.openModal      = openModal;
    vm.login          = login;
    vm.addNewItem     = addNewItem;
    vm.placeDetails   = placeDetails;

    /////////////////

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
      return ngGPlacesAPI.placeDetails({ placeDetailsKeys: ['formatted_address', 'formatted_phone_number',
        'reference', 'website', 'name', 'geometry', 'opening_hours'], placeId: vm.menu_id});
    }

    vm.priceOptions = [
      {
        id: 1,
        title: '$',
        active: false
      }, {
        id: 2,
        title: '$$',
        active: false
      }, {
        id: 3,
        title: '$$$',
        active: false
      }, {
        id: 4,
        title: '$$$$',
        active: false
      }
    ];
    vm.items = [];
    vm.newItem = {};

  };
  // addItemCtrl = function($rootScope, $scope, MenuItem) {
  //   $scope.newReview = {};
  //   $scope.addItem = function() {
  //     console.log($scope.newReview);
  //     return $rootScope.addNewItem($scope.newReview);
  //   };
  // };
  MenuCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'Menu', 'MenuItem', '$ionicModal', '$ionicLoading', '$compile', 'ImagesService', 'Auth', 'ngGPlacesAPI'];
  // addItemCtrl.$inject = ['$rootScope', '$scope', 'MenuItem'];
  return angular.module('app.modules.states.menu').controller('MenuCtrl', MenuCtrl).controller('addItemCtrl', addItemCtrl);
})();
