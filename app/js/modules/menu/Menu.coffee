angular.module('clurtch.modules.menu', [
  'clurtch.modules.menu.item'
  ])

.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state "menu",
      url: "/menu/:businessId"
      templateUrl: "js/components/menu/menu.html"
      controller: 'MenuCtrl'
    .state "menu.item",
      url: "/:itemId"
      templateUrl: "js/components/menu/item/item.html"
      controller: "ItemCtrl"
