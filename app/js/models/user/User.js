(function() {
  angular.module('app.model.user', []).factory('User', [
    'Restangular', 'Auth','$q','UserStorage', function(Restangular, Auth, $q, UserStorage) {
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
          var q = $q.defer()
          Restangular.one('users', id).all('collection').getList().then(function (data){
            q.resolve(data);
          })
          return q.promise;
        },
        getReviewsByUser: function(id){
          return Restangular.one('users', id).all('reviews').getList();
        },
        collectItem: function(item){
          var q = $q.defer()
          UserStorage
            .addItemToKeyInStorage('collection', item)
            .then(function(data){
              q.resolve(data)
            })
          return q.promise;
        },
        unCollectItem: function(item, callback){
          var q = $q.defer()
          UserStorage
            .removeItemFromKeyInStorage('collection', item)
            .then(function(data){
              q.resolve(data)
            })
          return q.promise;
        },
        bookmarkItem: function(item){
          var q = $q.defer()
          UserStorage
            .addItemToKeyInStorage('bookmarks', item)
            .then(function(data){
              q.resolve(data)
            })
          return q.promise;
        },
        unBookmarkItem: function(item){
          var q = $q.defer()
          UserStorage
            .removeItemFromKeyInStorage('bookmarks', item)
            .then(function(data){
              q.resolve(data)
            })
          return q.promise;
        },
        signup: function(username, password){
          return Restangular.all('users').all('signup')
            .post({username: username, password: password})
            .then(function(data) {
              if (data.error) {
                return this.status = data.message;
              }
              Auth.setAuthToken(data.neoId, data.username, data.token, data.fbSessionId, data);
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
              Auth.setAuthToken(data.neoId, data.username, data.token, data.fbSessionId, data);
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
