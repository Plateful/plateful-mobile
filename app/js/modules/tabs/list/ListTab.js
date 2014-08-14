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
              return data.itemArray;
            });
        }
      }
    });
  });
