(function() {
  (function() {

    /**
     * @name    MenuItem
     * @param   {Service} Restangular Restangular provider
     * @return  {Object} returns an object with all given methods
     */
    var MenuItem;
    MenuItem = function(Restangular, $q, findDistance, makeStars) {
      var Rest, findFilter, storage;
      Rest = Restangular.all('items');
      storage = {};
      findFilter = "";

      defaults = {
        distance: 5
      };

      nearbyItems = [];
      nearbyKeys = {};

      instance = {
        get: get,
        find: find,
        getByMenu: getByMenu,
        getByUser: getByUser,
        getItemReviews: getItemReviews,
        getItemPhotos: getItemPhotos,
        getByLocation: getByLocation,
        set: set,
        getStorage: getStorage,
        create: create,
        destroy: destroy
      };
      return instance;


      function start(){
        Restangular.all('items')
          .getList()
          .then(function (data) {
            _.each(data, function (item, index){

              item.dist = findDistance.get(item.menu.latitude, item.menu.longitude);
              if(item.dist > defaults.distance){
                item.stars = makeStars.get(item.rating);
                nearbyItems.push(item);
                nearbyKeys[item._id] = nearbyItems.length;
              }
            });
          });
      }
      function get() {
        var newPromise = $q.defer();
        if(!nearbyItems.length){
          start();
        }
        newPromise.resolve(nearbyItems);

        return newPromise.promise;
        // return Restangular.all('items').getList();
      }
      function find(id) {
        // var item = nearbyItems[ nearbyKeys[id] ];
        // if (item){
        //   var q = $q.defer()
        //   q.resolve(item)
        //   return q.promise;
        // }
        return Restangular.one('items', id).get();
      }
      function getByMenu(menu_id) {
        return Rest.one('menu', menu_id).get();
      }
      function getByUser(user_id) {
        return Rest.one('user', user_id).get();
      }
      function getItemReviews(item_id, cb) {
        return Restangular.one('items', item_id).all('photos').getList();
      }
      function getItemPhotos(item_id, cb) {
        return Restangular.one('items', item_id).all('photos').getList();
      }
      function getByLocation(data, filter) {
        var newPromise;
        newPromise = $q.defer();
        if (filter) {
          findFilter = filter;
        }
        if (filter === "empty") {
          findFilter = "";
        }
        // data.val = findFilter;
        return Rest.all('location').all(JSON.stringify(data)).getList().then(function(data) {
          var item, _i, _len;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            item = data[_i];
            item.dist = findDistance.get(item);
            item.stars = makeStars.get(item.rating);
          }
          return data
          // return newPromise.resolve(data);
        });
        // return newPromise.promise;
      }
      function set(key, obj) {
        return storage[key] = obj;
      }
      function getStorage(key) {
        if (key) {
          return storage[key];
        }
        return storage;
      }
      function create(data) {
        return Rest.post(data);
      }
      function destroy(id) {
        return Restangular.one('items', id).remove();
      }
    };

    MenuItem.$inject = ['Restangular', '$q', 'findDistance', 'makeStars'];
    return angular.module('app.model.item', []).factory('MenuItem', MenuItem);
  })();

}).call(this);
