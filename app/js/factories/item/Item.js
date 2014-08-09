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
      return {
        get: function() {
          return Restangular.all('items').getList();
        },
        find: function(id) {
          return Restangular.one('items', id).get();
        },
        getByMenu: function(menu_id) {
          return Rest.one('menu', menu_id).get();
        },
        getByUser: function(user_id) {
          return Rest.one('user', user_id).get();
        },
        getItemReviews: function(item_id, cb) {
          return Restangular.one('item', item_id).all('essay').get();
        },
        getItemGallery: function(item_id, cb) {
          return Restangular.one('item', item_id).all('gallery').get();
        },
        getByLocation: function(data, filter) {
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
        },
        set: function(key, obj) {
          return storage[key] = obj;
        },
        getStorage: function(key) {
          if (key) {
            return storage[key];
          }
          return storage;
        },
        create: function(data) {
          return Rest.post(data);
        },
        destroy: function(id) {
          return Restangular.one('items', id).remove();
        }
      };
    };
    MenuItem.$inject = ['Restangular', '$q', 'findDistance', 'makeStars', 'ImagesService'];
    return angular.module('app.factory.item', []).factory('MenuItem', MenuItem);
  })();

}).call(this);
