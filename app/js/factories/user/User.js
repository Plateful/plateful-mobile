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
        update: function(id, data) {},
        destroy: function(id) {},
        getPhotosByUser: function(){},
        getBookmarksByUser: function(){},
        getCollectionByUser: function(){},
        getReviewsByUser: function(){},

      };
    }
  ]);

}).call(this);
