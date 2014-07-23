angular.module('clurtch.modules.tabs.nearby', [
  'clurtch.modules.tabs.nearby.controllers'
  'clurtch.modules.tabs.nearby.services'
  ])

.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab.nearby",
      url: "/nearby"
      views:
        "tab-nearby":
          templateUrl: "js/modules/tabs/nearby/views/nearby.html"
          controller: "NearbyCtrl"
    .state "tab.nearby-map",
      url: "/nearby/map"
      views:
        "tab-nearby":
          templateUrl: "js/modules/states/map/map.html"
          controller: "MapCtrl"
    .state "tab.nearby-item",
      url: '/nearby/item/:itemId'
      views:
        "tab-nearby":
          templateUrl: "js/modules/states/item/item.html"
          controller: "ItemCtrl"

    .state "tab.nearby-menu",
      url: '/nearby/menu/:businessId'
      views:
        "tab-nearby":
          templateUrl: "js/modules/states/menu/menu.html"
          controller: "MenuCtrl"
