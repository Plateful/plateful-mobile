(function() {
  (function() {
    var MenuCtrl, addItemCtrl;
    MenuCtrl = function($rootScope, $scope, $stateParams, Menu, MenuItem, $ionicModal, $ionicLoading, $compile, ImagesService) {
      this.initialize = (function(_this) {
        return function() {
          _this.locate = window.currLocation.coords;
          _this.menu_id = $stateParams.menu_id;
          return _this.images = ImagesService.get();
        };
      })(this);
      Menu.find($scope.menu_id).then((function(_this) {
        return function(data) {
          var dist, from, to;
          _this.menu = data;
          from = new google.maps.LatLng(_this.locate.latitude, _this.locate.longitude);
          to = new google.maps.LatLng(data.lat, data.long);
          dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192;
          return _this.menu.dist = dist - dist % 0.001;
        };
      })(this));
      $ionicModal.fromTemplateUrl('js/modules/states/menu/modals/createItemModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          return _this.createModal = modal;
        };
      })(this));
      this.openModal = (function(_this) {
        return function() {
          return _this.createModal.show();
        };
      })(this);
      this.closeModal = (function(_this) {
        return function() {
          return _this.createModal.hide();
        };
      })(this);
      this.addNewItem = (function(_this) {
        return function(item) {};
      })(this);
      this.priceOptions = [
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
      this.items = [];
      this.newItem = {};
      this.initialize();
    };
    addItemCtrl = function($rootScope, $scope, MenuItem) {
      $scope.newReview = {};
      $scope.addItem = function() {
        console.log($scope.newReview);
        return $rootScope.addNewItem($scope.newReview);
      };
    };
    MenuCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'Menu', 'MenuItem', '$ionicModal', '$ionicLoading', '$compile', 'ImagesService'];
    addItemCtrl.$inject = ['$rootScope', '$scope', 'MenuItem'];
    return angular.module('app.modules.states.menu').controller('MenuCtrl', MenuCtrl).controller('addItemCtrl', addItemCtrl);
  })();

}).call(this);
