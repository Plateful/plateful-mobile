
/**
 * @name User Storage
 * @param {Restangular} Restangular RestangularServiceProvider
 */

(function() {
  var UserStorage;

  UserStorage = function(Restangular, $q) {
    var user_id = localStorage.getItem('user_id');
    var User = Restangular.one('users', user_id)
    syncAll()

    var storage = {
      collection: {},
      bookmarks: {},
      reviews: {},
      photos: {}

    }

    var store = {
      get: get,
      sync: sync,
      syncAll: syncAll,
      checkData: checkData,
      getData: getData,
      addItemToKeyInStorage: addItemToKeyInStorage,
      removeItemFromKeyInStorage: removeItemFromKeyInStorage,

    }

    return store;
    function checkData(key, item_id){
      console.log(storage)
      var q = $q.defer()
      var result = false
      get( key )
        .then(function (data){
          if(item_id in data){
            result = true
          } else {
            result = false
          }
          q.resolve(result)
        })
      return q.promise;
    };
    function getData(key, item_id){
      var q = $q.defer()
      var resultData = []
      get(key)
        .then( function (data){
          if(item_id){

            q.resolve( data[item_id] );

          } else {
            for(var id in data){
              resultData.push( data[id] )
            }
            q.resolve( resultData )
          }
        })
      return q.promise;
    };
    function set(key, val){
      storage[key] = val
    };
    function get(key){
      var q = $q.defer()
      if( Object.keys(storage[key]).length ){
        q.resolve( storage[key] );
      } else {
        sync( key )
          .then( function (data){
            q.resolve( data );
          });
      }
      return q.promise;
    };
    function syncAll(){
      _.each(['collection', 'bookmarks', 'reviews', 'photos'], function(item){
        sync(item)
      })
    };
    function sync(key){
      var q = $q.defer()
      User
        .all(key)
        .getList()
        .then( function (data){
          for(var i = 0; i<data.length; i++){
            storage[key][data[i]._id] = data;
          }
          q.resolve( storage[key] );
        })
        .catch( function ( msg) {
          q.reject( msg );
        })
      return q.promise;
    };
    function addItemToKeyInStorage(key, item){
      var q = $q.defer()
      addRelationshipInNeo4j(key, item._id)
        .then( function (addedItem){

          get( key )
            .then( function (data){

              data[addedItem._id] = addedItem
              set(key, data)
              q.resolve( addedItem )

            });
        })
      return q.promise;
    };
    function removeItemFromKeyInStorage(key, item){
      var q = $q.defer()

      removeRelationshipInNeo4j( key, item._id )
        .then( function (removedData){

          get( key )
            .then( function (data){

              delete data[removedData._id];
              set( key, data );
              q.resolve( removedData );

            });
        });

      return q.promise;

    };
    function addRelationshipInNeo4j(key, item_id){

      return User.all(key).all('true').post({item_id: item_id})

    }
    function removeRelationshipInNeo4j(key, item_id){

      return User.all(key).all('false').post({item_id: item_id})

    }

  };

  UserStorage.$inject = ['Restangular', '$q'];

  angular.module('app').factory('UserStorage', UserStorage);

}).call(this);
