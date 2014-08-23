(function(){
  var ListCtrl = function($scope, Auth, User, List, listInit, $state, UserStorage){

    var list = this;
    list.items = listInit;

    if (!localStorage.getItem('user_id')) {
      $state.go('tab.logins');
    }
    else if (!list.items) {
      $state.go('tab.empty-list');
    }

    list.showCollection = showCollection;
    list.showBookmarks  = showBookmarks;
    // list.login          = login;


    //////////////////

    getCollection();
    getBookmarks();
    list.viewBookmarks = true;
    function getCollection(){
      UserStorage.getData('collection')
        .then(function ( data ){
          console.log(data);
          list.collection = data;
          list.collectionCount = data.length;
        })
    }
    function getBookmarks(){
      UserStorage.getData('bookmarks')
        .then(function ( data ){
          list.bookmarks = data;
          list.bookmarksCount = data.length;
        });
    }

    function showBookmarks(){
      list.viewCollection = false;
      list.viewBookmarks = true;
    }
    function showCollection(){
      list.viewBookmarks = false;
      list.viewCollection = true;
    }
    // function login(){
    //   Auth.setAuthToken( list.username, list.password );
    // };
  };

  ListCtrl.$inject = ['$scope', 'Auth', 'User', 'List', 'listInit', '$state', 'UserStorage'];
  angular
    .module('app.tabs.list')
    .controller('ListCtrl', ListCtrl);

})();
