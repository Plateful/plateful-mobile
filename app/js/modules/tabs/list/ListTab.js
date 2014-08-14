angular
  .module('app.modules.tabs.list', [])
  .config(function($stateProvider) {
    $stateProvider.state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'js/modules/tabs/list/views/list.html',
          controller: 'ListCtrl as list'
        }
      },
      resolve: {
        listInit: function(List, $q) {
          return List.getList()
            .then(function(data) {
              if (data.itemArray.length === 0) {
                return null;
              }
              return data.itemArray;
            });
        }
      }
    }).state('tab.bookmarks', {
      url: '/list/bookmarks',
      views: {
        'tab-list': {
          templateUrl: 'js/modules/tabs/list/views/bookmarks.html'
        }
      }
    }).state('tab.empty-list', {
      url: '/list/get-started',
      views: {
        'tab-list': {
          templateUrl: 'js/modules/tabs/list/views/empty-list.html'
        }
      }
    }).state('tab.logins', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'js/modules/states/login/views/login.html',
          controller: 'LoginCtrl as login'
        }
      }
    })
  });
