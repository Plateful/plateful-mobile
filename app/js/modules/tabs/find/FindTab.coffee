angular.module('clurtch.modules.tabs.find', [
  'clurtch.modules.tabs.find.controllers'
  ])

.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider

  .state "tab.find",
    url: "/find"
    views:
      "tab-find":
        templateUrl: "js/modules/tabs/find/views/find.html"        
        controller: "FindCtrl"
  .state "tab.map",
    url: "/map"
    views:
      "tab-find":
        templateUrl: "js/modules/states/map/map.html"
        controller: "MapCtrl"

  .state "tab.find-item",
    url: '/find/item/:itemId'
    views:
      "tab-find":
        templateUrl: "js/modules/states/item/item.html"
        controller: "ItemCtrl"

  .state "tab.find-menu",
    url: '/find/menu/:businessId'
    views:
      "tab-find":
        templateUrl: "js/modules/states/menu/menu.html"
        controller: "MenuCtrl"
