(function() {
  (function() {

    /**
     * @name    MenuItem
     * @param   {Service} Restangular Restangular provider
     * @return  {Object} returns an object with all given methods
     */
    var MenuItem;
    MenuItem = function(Restangular, $q, findDistance, makeStars, ImagesService) {
      var Rest, findFilter, storage;
      Rest = Restangular.all('items');
      storage = {};
      findFilter = "";

      defaults = {
        distance: 5
      }

      nearbyItems = [];
      nearbyKeys = {}

      instance = {
        get: get,
        find: find,
        getByMenu: getByMenu,
        getByUser: getByUser,
        getItemReviews: getItemReviews,
        getItemGallery: getItemGallery,
        getByLocation: getByLocation,
        set: set,
        getStorage: getStorage,
        create: create,
        destroy: destroy
      }
      return instance;


      function start(){
        Restangular.all('items')
          .getList()
          .then(function (data) {
            _.each(data, function (item, index){

              item.dist = findDistance.get(item.menu.latitude, item.menu.longitude);
              if(item.dist > defaults.distance){
                item.stars = makeStars.set(item);
                nearbyItems.push(item);
                nearbyKeys[item._id] = nearbyItems.length
              }
            });
          });
      };
      function get() {
        var newPromise = $q.defer()
        if(!nearbyItems.length){
          start()
        }
        newPromise.resolve(nearbyItems);

        return newPromise.promise
        // return Restangular.all('items').getList();
      };
      function find(id) {
        var item = nearbyItems[ nearbyKeys[id] ];
        if (item){
          var q = $q.defer()
          q.resolve(item)
          return q.promise;
        }
        return Restangular.one('items', id).get();
      };
      function getByMenu(menu_id) {
        return Rest.one('menu', menu_id).get();
      };
      function getByUser(user_id) {
        return Rest.one('user', user_id).get();
      };
      function getItemReviews(item_id, cb) {
        return Restangular.one('item', item_id).all('essay').get();
      };
      function getItemGallery(item_id, cb) {
        return Restangular.one('item', item_id).all('gallery').get();
      };
      function getByLocation(data, filter) {
        var newPromise;
        newPromise = $q.defer();
        if (filter) {
          findFilter = filter;
        }
        if (filter === "empty") {
          findFilter = "";
        }
        data.val = findFilter;
        Rest.all('location').post(data).then(function(data) {
          var item, _i, _len;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            item = data[_i];
            item.dist = findDistance.get(item);
            item.stars = makeStars.set(item);
            item.image_url = ImagesService.get();
          }
          return newPromise.resolve(data);
        });
        return newPromise.promise;
      };
      function set(key, obj) {
        return storage[key] = obj;
      };
      function getStorage(key) {
        if (key) {
          return storage[key];
        }
        return storage;
      };
      function create(data) {
        return Rest.post(data);
      };
      function destroy(id) {
        return Restangular.one('items', id).remove();
      };
    };

    MenuItem.$inject = ['Restangular', '$q', 'findDistance', 'makeStars', 'ImagesService'];
    return angular.module('app.model.item', []).factory('MenuItem', MenuItem);
  })();

}).call(this);
