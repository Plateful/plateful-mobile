(function(){
  var ListCtrl = function($scope, Auth, User, List, listInit, $state){

    var list = this;
    list.items = listInit;

    if (!localStorage.getItem('user_id')) {
      console.log('y')
      $state.go('tab.logins');
    }
    else if (!list.items) {
      $state.go('tab.empty-list');
    }

    // list.showPhotos     = showPhotos;
    // list.showCollection = showCollection;
    // list.showBookmarks  = showBookmarks;
    // list.login          = login;

    // ////////////////

    // function showPhotos(){
    //   User
    //     .getPhotosByUsers()
    //     .then(function(data){
    //       list.photos = data;
    //     })
    //     .error(function(msg){
    //       alert("Error on showPhotos", msg)
    //     })
    // };
    // function showCollection(){
    //   User
    //     .getCollectionByUser()
    //     .then(function(data){
    //       list.collection = data
    //     })
    //     .error(function(msg){
    //       alert("Error on get Collection", msg)
    //     })
    // };
    // function showBookmarks(){
    //   User
    //     .getBookmarksByUser()
    //     .then(function(data){
    //       list.bookmarks = data;
    //     })
    //     .error(function(msg){
    //       alert("Error on get bookmarks", msg)
    //     })
    // };
    // function login(){
    //   Auth.setAuthToken( list.username, list.password );
    // };
  }

  ListCtrl.$inject = ['$scope', 'Auth', 'User', 'List', 'listInit', '$state']
  angular
    .module('app.modules.tabs.list')
    .controller('ListCtrl', ListCtrl)

})();
