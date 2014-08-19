
/**
 * @name User Storage
 * @param {Restangular} Restangular RestangularServiceProvider
 */

(function() {
  var UserStorage;

  UserStorage = function(Restangular, $q) {

    var user_id = localStorage.getItem('user_id');
    sync()

    var store = {
      get: get,
      collection: collection,
      photos: photos,
      reviews: reviews,
      bookmarks: bookmarks,
      checkStorage: checkStorage,
      sync: sync

    }

    return store;
    function get(key) {
      var q = $q.defer()
      checkStorage(key)
        .then(function (data){
          q.resolve(data)
        })
      return q.promise
    };
    function collection(id) {
      var q = $q.defer()
      checkStorage('collection')
        .then(function (data){
          // if(id) {
          if(data.length){
            var obj = _.where(data, {_id: Number(id)});
            if ( obj.length ){

              q.resolve( obj );
            } else {
              q.reject("Collection not found");
            }
          } else {
              q.reject("Collection not found");
          }

        })
      return q.promise;
    };
    function photos(id) {
      var q = $q.defer()
      checkStorage('photos')
        .then(function (data){
          log( "photos", data)
          if(id) {
            var obj = _.where(data, {_id: Number(id)});
            if ( obj.length ){

              q.resolve( obj )

            }

          } else {

            q.resolve( data )

          }
        })
      return q.promise;
    };
    function reviews(id) {
      var q = $q.defer()
      checkStorage('reviews')
        .then(function (data){
          log('reviews', data)
          if(id) {
            var obj = _.where(data, {_id: Number(id)});
            if ( obj.length ){

              q.resolve( obj )
            }

          } else {

            q.resolve( data )

          }
        })
      return q.promise;
    };
    function bookmarks(id){
      var q = $q.defer()
      checkStorage('bookmarks')
        .then(function (data){
          log( "bokmarks", data)
          if(data.length){
            var obj = _.where(data, {_id: Number(id)});
            if ( obj.length ){

              q.resolve( obj );
            } else {
              q.reject("bookmarks not found");
            }
          } else {
              q.reject("bookmarks not found");
          }
        })
      return q.promise;
    };
    function checkStorage(key){
      var q = $q.defer()
      var obj = JSON.parse( localStorage.getItem( 'user_' + key) );


      if(obj){

        q.resolve( obj );
        return q.promise;

      }

      Restangular
        .one('users', user_id)
        .all(key)
        .getList()
        .then(function (data){
          if (data.length){
            localStorage.setItem( 'user_' + key, JSON.stringify( data ) );
            q.resolve( data );
          }

        })

        return q.promise;

    };
    function sync(){
      _.each(['collection', 'bookmarks', 'reviews', 'photos'], function (item){
        Restangular
          .one('users', user_id)
          .all(item)
          .getList()
          .then(function (data){
            if (data.length){
              localStorage.setItem( 'user_' + item, JSON.stringify( data ) );
            }
          })
      })

    };
  };

  UserStorage.$inject = ['Restangular', '$q'];

  angular.module('app').factory('UserStorage', UserStorage);

}).call(this);
