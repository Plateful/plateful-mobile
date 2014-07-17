angular.module('clurtch.modules.tabs.nearby', [
  'clurtch.modules.tabs.nearby.controllers'
  'clurtch.modules.tabs.nearby.services'
  ])

.config ($stateProvider)->
  $stateProvider
    # .state "tab.nearby",
    #   url: "/nearby"
    #   views:
    #     "tab-nearby":
    #       templateUrl: "js/components/tabs/nearby/views/nearby.html"
    #       controller: "NearbyCtrl"
    .state "tab.nearby.menu",
      url: "/menu/:businessId"
      templateUrl: "js/modules/menu/menu.html"
      controller: 'MenuCtrl'
      #this one has no view yet

    # ########
    #
    # All States within tabs.home go in here
    #
    # #######
