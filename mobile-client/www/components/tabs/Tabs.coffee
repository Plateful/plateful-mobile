angular.module('clurtch.components.tabs', [
  'clurtch.components.tabs.find'
  'clurtch.components.tabs.home'
  'clurtch.components.tabs.share'
  'clurtch.components.tabs.notify'
  'clurtch.components.tabs.settings'
  ])
.config ($stateProvider)->

    # ########
    #
    # All States within tabs.find go in here
    #
    # #######

  # $stateProvider
  #   .state('tabs',
  #     url: '/tabs'
  #     tempateUrl: 'js/components/tabs/find/views/'
  #     controler: ''
  #   )
  #   .state('tabs.find',
  #     url: '/find'
  #     tempateUrl: 'js/components/tabs/find/views/'
  #     controler: ''
  #   )
  #   .state('tabs.home',
  #     url: '/home'
  #     tempateUrl: 'js/components/tabs/find/views/'
  #     controler: ''
  #   )
  #   .state('tabs.share',
  #     url: '/share'
  #     tempateUrl: 'js/components/tabs/find/views/'
  #     controler: ''
  #   )
  #   .state('tabs.home',
  #     url: '/home'
  #     tempateUrl: 'js/components/tabs/find/views/'
  #     controler: ''
  #   )
