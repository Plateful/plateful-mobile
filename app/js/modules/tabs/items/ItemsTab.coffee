angular.module('app.modules.tabs.items', [
  'app.modules.tabs.items.controllers'
  ])

.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider

  .state "tab.items",
    url: "/items"
    views:
      "tab-items":
        templateUrl: "js/modules/tabs/items/views/items.html"
        controller: "ItemsCtrl"

  .state "tab.items-map",
    url: "/items/map"
    views:
      "tab-items":
        templateUrl: "js/modules/states/map/views/map.html"
        controller: "MapCtrl"

  .state "tab.items-item",
    url: '/items/item/:itemId'
    views:
      "tab-items":
        templateUrl: "js/modules/states/item/item.html"
        controller: "ItemCtrl"

  .state "tab.items-menu",
    url: '/items/menu/:businessId'
    views:
      "tab-items":
        templateUrl: "js/modules/states/menu/menu.html"
        controller: "MenuCtrl"
