/**
 * @name User Storage
 * @param {Restangular} Restangular RestangularServiceProvider
 */
(function() {
  var UserStorage;

  UserStorage = function(Restangular, $q) {

    syncAll();

    // User Storage Object
    var storage = {
      collection: {},
      bookmarks: {},
      reviews: {},
      photos: {}
    };

    // Methods to return from UserStorage
    var store = {
      sync: sync,
      syncAll: syncAll,
      checkData: checkData,
      getData: getData,
      addRelationshipInNeo4j: addRelationshipInNeo4j,
      removeRelationshipInNeo4j: removeRelationshipInNeo4j
    };

    return store;

    //////////////////////////

    function checkData(key, item_id){
      return getFromLocalStorage( key )
        .then(function ( data ){
          return _.has(data, item_id);
        })
    }


    function getData(key, item_id){
      return getFromLocalStorage( key ).then(function (data){
        if(item_id) return data[item_id];
        else {
          return _.values(data);
        }
      })
    }

    function getFromLocalStorage(key){
      var q = $q.defer();
      if( Object.keys(storage[key]).length ) q.resolve(storage[key]);
      else {
        return sync(key).then(function(data){
          return storage[key];
        })
      }
      return q.promise;
    }

    function sync(key){
      return Restangular.one('users', localStorage.user_id)
        .all(key).getList()
        .then(function ( data ){
          for(var i = 0; i<data.length; i++){
            if(typeof data[i] !== 'function'){
              storage[key][data[i]._id] = data[i];
            }
          }
          return data;
        });
    }

    function syncAll(){
      _.forEach(['collection', 'bookmarks', 'reviews', 'photos'], function (item){
        sync(item);
      });
    }

    function addRelationshipInNeo4j(key, item_id){
      return Restangular.one('users', localStorage.user_id)
        .all(key).all('true').post({item_id: item_id})
        .then( function ( data ){
          storage[key][data._id] = data;
          return data
        });

    }

    function removeRelationshipInNeo4j(key, item_id){
      return Restangular.one('users', localStorage.user_id)
        .all(key).all('false').post({item_id: item_id})
        .then( function ( data ){
          delete storage[key][data._id]
          return data
        });
    }

  };

  UserStorage.$inject = ['Restangular', '$q'];

  angular.module('app').factory('UserStorage', UserStorage);

}).call(this);
