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
          templateUrl: 'js/tabs/settings/views/account.html',
          controller: 'AccountCtrl as account'
        }
      },
      resolve: {
        accountInit: function(User, $ionicLoading) {
          $ionicLoading.show({template:'Fetching Your Info...'});
          return User.findByParseUsername(localStorage.getItem('user_email'))
            .then(function(data) {
              $ionicLoading.hide();
              console.log(data)
              return data;
            });
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
