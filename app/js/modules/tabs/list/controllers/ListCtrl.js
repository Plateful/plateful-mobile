(function(){
  var ListCtrl = function($scope, Auth){

    var vm = this

    vm.showPhotos     = showPhotos;
    vm.showCollection = showCollection;
    vm.showBookmarks  = showBookmarks;
    vm.login          = login;

    ////////////////


    function showPhotos(){};
    function showCollection(){};
    function showBookmarks(){};
    function login(){
      Auth.setAuthToken( vm.username, vm.password );
    };
  }

  ListCtrl.$inject = ['$scope', 'Auth']
  angular
    .module('app.modules.tabs.list')
    .controller('ListCtrl', ListCtrl)

})();
