(function(){
  var ListCtrl = function($scope, Auth, User){

    var vm = this

    vm.showPhotos     = showPhotos;
    vm.showCollection = showCollection;
    vm.showBookmarks  = showBookmarks;
    vm.login          = login;

    ////////////////

    function showPhotos(){
      User
        .getPhotosByUsers()
        .then(function(data){
          vm.photos = data;
        })
        .error(function(msg){
          alert("Error on showPhotos", msg)
        })
    };
    function showCollection(){
      User
        .getCollectionByUser()
        .then(function(data){
          vm.collection = data
        })
        .error(function(msg){
          alert("Error on get Collection", msg)
        })
    };
    function showBookmarks(){
      User
        .getBookmarksByUser()
        .then(function(data){
          vm.bookmarks = data;
        })
        .error(function(msg){
          alert("Error on get bookmarks", msg)
        })
    };
    function login(){
      Auth.setAuthToken( vm.username, vm.password );
    };
  }

  ListCtrl.$inject = ['$scope', 'Auth', 'User']
  angular
    .module('app.modules.tabs.list')
    .controller('ListCtrl', ListCtrl)

})();
