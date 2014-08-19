
/**
 * @name User Storage
 * @param {Restangular} Restangular RestangularServiceProvider
 */

(function() {
  var UserStorage;

  UserStorage = function(Restangular, $q) {
  var user_id = localStorage.getItem('user_id');

    var store = {
      get: get,
      photos: photos,
      collection: collection,
      bookmarks: bookmarks,
      checkStorage: checkStorage
    }

    return store;

    function get(key) {
      var q = $q.defer()
      checkStorage(key)
        .then(function (data){
          console.log("from get", data)
          q.resolve(data)
        })
      return q.promise
    };
    function photos() {
      var q = $q.defer()
      checkStorage('photos')
        .then(function (data){
          q.resolve( data )
        })
      return q.promise;
    };
    function reviews() {
      var q = $q.defer()
      checkStorage('reviews')
        .then(function (data){
          q.resolve( data )
        })
      return q.promise;
    };
    function collection() {
      var q = $q.defer()
      checkStorage('collection')
        .then(function (data){
          q.resolve( data )
        })
      return q.promise;
    };
    function bookmarks(){
      var q = $q.defer()
      checkStorage('bookmarks')
        .then(function (data){
          q.resolve( data )
        })
      return q.promise;
    };
    function checkStorage(key){
      var q = $q.defer()
      var obj = localStorage.getItem( 'user_' + key);

      if(obj){

        q.resolve( JSON.parse(obj) );
        return q.promise;

      }

      Restangular
        .one('users', user_id)
        .all(key)
        .getList()
        .then(function (data){

          localStorage.setItem( 'user_' + key, JSON.stringify( data ) );
          q.resolve( data );

        })

        return q.promise;

    };
  };

  UserStorage.$inject = ['Restangular', '$q'];

  angular.module('app').factory('UserStorage', UserStorage);

}).call(this);
