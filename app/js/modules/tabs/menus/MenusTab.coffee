angular.module('app.modules.tabs.menus', [
  'app.modules.tabs.menus.controllers'
  'app.modules.tabs.menus.services'
  ])

.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "tab.menus",
      url: "/menus"
      views:
        "tab-menus":
          templateUrl: "js/modules/tabs/menus/views/menus.html"
          controller: "MenusCtrl"

    .state "tab.menus-map",
      url: "/menus/map"
      views:
        "tab-menus":
          templateUrl: "js/modules/states/map/views/menusMap.html"
          controller: "MenusMapCtrl"

    .state "tab.menus-item",
      url: '/menus/item/:itemId'
      views:
        "tab-menus":
          templateUrl: "js/modules/states/item/item.html"
          controller: "ItemCtrl"

    .state "tab.menus-menu",
      url: '/menus/menu/:businessId'
      views:
        "tab-nearby":
          templateUrl: "js/modules/states/menu/menu.html"
          controller: "MenuCtrl"
