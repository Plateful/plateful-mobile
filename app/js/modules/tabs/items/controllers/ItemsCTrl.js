(function() {
  (function() {
    var ItemsCtrl;
    ItemsCtrl = function($scope, $ionicModal, MenuItem, Menu, ImagesService) {
      var closeModal, getMenuItems, initializeModal, openModal, querySearch;
      this.initialize = (function(_this) {
        return function() {
          _this.locate = window.currLocation.coords;
          _this.images = ImagesService.get();
          _this.locationData = {
            lat: _this.locate.latitude,
            lng: _this.locate.longitude
          };
          _this.querySearch = querySearch;
          getMenuItems(null).then(function(data) {
            _this.items = data;
          });
          _this.closeModal = closeModal;
          return _this.openModal = openModal;
        };
      })(this);
      getMenuItems = (function(_this) {
        return function(filter) {
          return MenuItem.getByLocation(_this.locationData, null);
        };
      })(this);
      querySearch = (function(_this) {
        return function(itemsFilter) {
          itemsFilter = itemsFilter || "empty";
          return MenuItem.getByLocation(_this.locationData, itemsFilter).then(function(data) {
            _this.items = newData;
          });
        };
      })(this);
      initializeModal = (function(_this) {
        return function() {
          return $ionicModal.fromTemplateUrl("js/modules/tabs/find/modals/filterModal.html", {
            scope: $scope,
            animation: "slide-in-up"
          }).then(function(modal) {
            _this.filterModal = modal;
          });
        };
      })(this);
      openModal = (function(_this) {
        return function() {
          return _this.filterModal.show();
        };
      })(this);
      closeModal = (function(_this) {
        return function() {
          return _this.filterModal.hide();
        };
      })(this);
      this.initialize();
    };
    ItemsCtrl.$inject = ["$scope", "$ionicModal", "MenuItem", "Menu", "ImagesService"];
    angular.module("app").controller("ItemsCtrl", ItemsCtrl);
  })();

}).call(this);
