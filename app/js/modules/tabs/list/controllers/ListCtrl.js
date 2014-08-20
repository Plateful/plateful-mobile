(function(){
  var ListCtrl = function($scope, Auth, User, List, listInit, $state, UserStorage){

    var list = this;
    list.items = listInit;

    if (!localStorage.getItem('user_id')) {
      console.log('y')
      $state.go('tab.logins');
    }
    else if (!list.items) {
      $state.go('tab.empty-list');
    }

    list.showCollection = showCollection;
    list.showBookmarks  = showBookmarks;
    // list.login          = login;


    // ////////////////

    getCollection()
    getBookmarks()
    list.viewBookmarks = true;
    function getCollection(){
      UserStorage
        .getData('collection')
        .then(function (data){
          list.collection = data[0];
          console.log("collection", data[0])
        })
    }
    function getBookmarks(){
      UserStorage
        .getData('bookmarks')
        .then(function (data){
          list.bookmarks = data[0];
          console.log("bookmarks", data[0])
        })
    }

    function showBookmarks(){
      list.viewCollection = false
      list.viewBookmarks = true
    };
    function showCollection(){
      list.viewBookmarks = false
      list.viewCollection = true
    };
    // function login(){
    //   Auth.setAuthToken( list.username, list.password );
    // };
  }

  ListCtrl.$inject = ['$scope', 'Auth', 'User', 'List', 'listInit', '$state', 'UserStorage']
  angular
    .module('app.modules.tabs.list')
    .controller('ListCtrl', ListCtrl)

})();
