(function() {
  var List = function(Restangular) {
    var Rest = Restangular.all('lists');
    var user = localStorage.getItem('user_id');

    var getList = function() {
      return Rest.one('John').get();
    };

    var getBookmarks = function() {
      return Rest.one('John').get()
    }

    var getCollections = function() {
      return Rest.one('John').get()
    }



    var listFactory = {
      getList: getList,
      getBookmarks: getBookmarks,
      getCollections: getCollections
    }

    return listFactory;
  }


  List.$inject = ['Restangular'];
  angular.module('app.model.list', [])
    .factory('List', List);
}).call(this);