angular.module('clurtch.modules.tabs.settings', [
  'clurtch.modules.tabs.settings.controllers'
])

.config ($stateProvider)->
  $stateProvider
    .state 'tab.settings',
      url: '/settings'
      views:
        'tab-settings':
          templateUrl: 'js/modules/tabs/settings/views/settings.html'
          controller: 'SettingsCtrl'

    .state 'tab.account',
      url: '/account'
      views:
        'tab-settings':
          templateUrl: 'js/modules/tabs/settings/views/account.html'

    # ########
    #
    # All States within tabs.settings go in here
    #
    # #######
