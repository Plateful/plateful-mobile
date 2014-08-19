(function() {
  angular.module('app.modules.tabs.review', ['app.modules.tabs.review.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
      return $stateProvider.state("tab.review", {
        url: "/review",
        views: {
          "tab-review": {
            templateUrl: "js/modules/tabs/review/views/review.html",
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
            $ionicLoading.show({template:'Loading Menus...'});
            return Menu.getByLocation(coords, null)
              .then(function(menus) {
                // Add distance from user to each menu.
                _.each(menus, function(menu) {
                  menu.dist = BackgroundGeo.distance(menu.latitude, menu.longitude);
                })
                $ionicLoading.hide();
                return menus;
              });
          }
        }
      }).state("tab.review-choose-item", {
        url: '/review/choose-item/:businessId',
        views: {
          "tab-review": {
            templateUrl: 'js/modules/tabs/review/views/chooseItem.html',
            controller: 'ReviewItemCtrl as reviewItem'
          }
        },
        resolve: {
          menuInit: function($stateParams, Menu) {
            var menuId = $stateParams.businessId;
            return Menu.find(menuId)
              .then(function(menu) {
                return menu;
              });
          },
          menuItemsInit: function($stateParams, Menu, $ionicLoading) {
            $ionicLoading.show({template:'Loading Menu Items...'});
            var menuId = $stateParams.businessId;
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
            templateUrl: 'js/modules/tabs/review/views/create-item.html',
            controller: 'createItemCtrl as vm'
          }
        }
      }).state("tab.review-create", {
        url: '/review/create/:itemId',
        views: {
          "tab-review": {
            templateUrl: 'js/modules/tabs/review/views/create.html',
            controller: 'createReviewCtrl as vm'
          }
        }
      });
    });

}).call(this);
