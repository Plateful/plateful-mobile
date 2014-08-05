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
        post: function(data) {
          return User.post(data);
        },
        update: function(id, data) {},
        destroy: function(id) {}
      };
    }
  ]);

}).call(this);
