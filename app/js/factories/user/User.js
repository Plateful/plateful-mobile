(function() {
  angular.module('app.factory.user', []).service('User', [
    'Restangular', function(Rest) {
      var User;
      User = Rest.all('users');
      return {
        get: function() {
          return User;
        },
        find: function(id) {
          return Rest.one('users', id);
        },
        create: function(data) {
          return User.post(data);
        },
        update: function(id, data) {
          return Restangular.one('users', id).post(data).get()
        },
        destroy: function(id) {
          return Restangular.on('users', id).delete()
        },
        getPhotosByUser: function(id){
          return Restangular.one('users', id).all('photos').getList()
        },
        getBookmarksByUser: function(id){
          return Restangular.one('users', id).all('bookmarks').getList()
        },
        getCollectionByUser: function(){
          return Restangular.one('users', id).all('collection').getList()
        },
        getReviewsByUser: function(id){
          return Restangular.one('users', id).all('reviews').getList()
        },
      };
    }
  ]);

}).call(this);
