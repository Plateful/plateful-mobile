(function() {
  angular.module('app.factory.user', []).service('User', [
    'Restangular', 'Auth', function(Restangular, Auth) {
      var User = Restangular.all('users');

      return {
        status: undefined,
        get: function() {
          return User;
        },
        find: function(id) {
          return Restangular.one('users', id);
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
          return Restangular.one('users', id).all('reviews').getList();
        },
        signup: function(username, password){
          return Restangular.all('users').all('signup')
            .post({username: username, password: password})
            .then(function(data) {
              if (data.error) {
                return this.status = data.message;
              }
              Auth.setAuthToken(data.username, data.token, data.fbSessionId, data);
              this.status = 'Account created!'
            }.bind(this));
        },
        login: function(username, password){
          return Restangular.all('users').all('login')
            .post({username: username, password: password})
            .then(function(data) {
              if (data.error) {
                return this.status = data.message;
              }
              Auth.setAuthToken(data.username, data.token, data.fbSessionId, data);
              this.status = 'Logged In!'
            }.bind(this))
        },
        logout: function() {
          Auth.resetSession();
        }
      };
    }
  ]);

}).call(this);
