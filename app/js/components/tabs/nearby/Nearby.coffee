angular.module('clurtch.components.tabs.nearby', [
  'clurtch.components.tabs.nearby.controllers'
  #'clurtch.components.tabs.nearby.directives'
  'clurtch.components.tabs.nearby.services'
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
      templateUrl: "js/components/menu/menu.html"
      controller: 'MenuCtrl'
      #this one has no view yet

    # ########
    #
    # All States within tabs.home go in here
    #
    # #######

  # $stateProvider
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
    # .sate('tabs.home.?',
    #   url: '/tabs/home/'
    #   tempateUrl: 'js/components/tabs/home/views/'
    #   controler: ''
    # )
