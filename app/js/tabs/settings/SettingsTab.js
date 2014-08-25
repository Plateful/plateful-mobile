(function() {
  angular.module('app.tabs.settings', ['app.tabs.settings.controllers']).config(function($stateProvider) {
    return $stateProvider.state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'js/tabs/settings/views/settings.html',
          controller: 'SettingsCtrl as vm'
        }
      }
    }).state('tab.account', {
      url: '/account',
      views: {
        'tab-settings': {
          templateUrl: 'js/tabs/settings/views/account.html'
        }
      }
    }).state('tab.login', {
      url: '/login',
      views: {
        'tab-settings': {
          templateUrl: 'js/states/login/views/login.html',
          controller: 'LoginCtrl as login'
        }
      }
    });
  });

}).call(this);
