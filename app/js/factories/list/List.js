(function() {
  var List = function(Restangular) {
    var Rest = Restangular.all('lists');
    var user = localStorage.getItem('user_id');
    console.log("USER ", user);

    var getList = function() {
      return Rest.one('John').get();
    }



    var listFactory = {
      getList: getList
    }

    return listFactory;
  }


  List.$inject = ['Restangular'];
  angular.module('app.factory.list', [])
    .factory('List', List);
}).call(this);