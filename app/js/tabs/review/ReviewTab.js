(function() {
  angular.module('app.tabs.review', ['app.tabs.review.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
      return $stateProvider.state("tab.review", {
        url: "/review",
        views: {
          "tab-review": {
            templateUrl: "js/tabs/review/views/review.html",
            controller: 'ReviewMenuCtrl as reviewMenu'
          }
        },
        resolve: {
          locationData: function() {
            return {
              lat: window.currLocation.coords.latitude,
              lng: window.currLocation.coords.longitude,
              dist: 0.6
            };
          },
          reviewMenuInit: function(Menu, BackgroundGeo, $ionicLoading) {
            var coords = this.resolve.locationData();
            $ionicLoading.show({template:'Finding Nearby Restaurants...'});
            return Menu.getByLocation(coords, null)
              .then(function(menus) {
                // Add distance from user to each menu.
                _.each(menus, function(menu) {
                  menu.dist = BackgroundGeo.distance(menu.latitude, menu.longitude);
                });
                $ionicLoading.hide();
                return menus;
              });
          }
        }
      }).state("tab.review-choose-item", {
        url: '/review/choose-item/:menuId',
        views: {
          "tab-review": {
            templateUrl: 'js/tabs/review/views/chooseItem.html',
            controller: 'ReviewItemCtrl as reviewItem'
          }
        },
        resolve: {
          menuInit: function($stateParams, Menu) {
            var menuId = $stateParams.menuId;
            return Menu.find(menuId)
              .then(function(menu) {
                return menu;
              });
          },
          menuItemsInit: function($stateParams, Menu, $ionicLoading) {
            $ionicLoading.show({template:'Loading Menu Items...'});
            var menuId = $stateParams.menuId;
            return Menu.getMenuItems(menuId)
              .then(function(items) {
                $ionicLoading.hide();
                return items;
              });
          }
        }
      }).state("tab.review-create-item", {
        url: '/review/create-item',
        views: {
          "tab-review": {
            templateUrl: 'js/tabs/review/views/create-item.html',
            controller: 'createItemCtrl as vm'
          }
        }
      }).state("tab.review-create", {
        url: '/review/create/:itemId',
        views: {
          "tab-review": {
            templateUrl: 'js/tabs/review/views/create.html',
            controller: 'createReviewCtrl as createReviewView'
          }
        },
        resolve: {
          createReviewInit: function($stateParams, MenuItem, $ionicLoading, $q) {
            $ionicLoading.show({template: "Loading Item..."});
            var itemId = $stateParams.itemId;
            return MenuItem.find(itemId)
              .then(function(item) {
                $ionicLoading.hide();
                return item[0];
              });
          }
        }
      });
    });

}).call(this);
