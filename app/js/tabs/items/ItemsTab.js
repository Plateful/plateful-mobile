(function() {
  angular.module('app.tabs.items', []).config(function($stateProvider, $urlRouterProvider) {
    return $stateProvider.state("tab.items", {
      url: "/items",
      views: {
        "tab-items": {
          templateUrl: "js/tabs/items/views/items.html",
          controller: "ItemsCtrl as vm"
        }
      }
    }).state("tab.items-map", {
      url: "/items/map",
      views: {
        "tab-items": {
          templateUrl: "js/states/map/views/map.html",
          controller: "MapCtrl as vm"
        }
      }
    }).state("tab.items-item", {
      url: '/items/item/:itemId',
      views: {
        "tab-items": {
          templateUrl: "js/states/item/item.html",
          controller: "ItemCtrl as vm",
          resolve: {
            resolvedItem: function(MenuItem, $q, $stateParams){

              var scope = {};
              scope.item_id = $stateParams.itemId;
              var q = $q.defer();

              MenuItem
                .find(scope.item_id)
                .then(function(data) {
                  console.log("item", data[0]);
                  scope.item = data[0];
                  // vm.options = {scrollwheel: false};

                  scope.options = {scrollwheel: false};
                  scope.map = {center: {latitude: scope.item.lat, longitude: scope.item.lon }, zoom: 15 };
                  scope.marker = {
                      id: scope.item._id,
                      coords: {
                          // latitude: 40.1451,
                          // longitude: -99.6680

                        latitude: scope.item.lat,
                        longitude: scope.item.lon
                      },
                      options: { draggable: true },
                      events: {
                          dragend: function (marker, eventName, args) {
                              console.log('marker dragend');
                              console.log(marker.getPosition().lat());
                              console.log(marker.getPosition().lng());
                          }
                      }
                  };
                q.resolve(scope);
              });
              return q.promise;

            }
          }
        }
      }
    }).state("tab.items-menu", {
      url: '/items/menu/:menu_id',
      views: {
        "tab-items": {
          templateUrl: "js/states/menu/menu.html",
          controller: "MenuCtrl as vm"
        }
      }
    }).state("tab.item-map", {
      url: '/items/map/:item_id',
      views: {
        "tab-items": {
          templateUrl: "js/states/map/views/menusMap.html",
          controller: "ItemMapCtrl as vm"
        }
      }
    });
  });

}).call(this);
