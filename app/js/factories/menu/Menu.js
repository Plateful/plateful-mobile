(function() {
  /**
   * Menu Model Factory for interacting with REST Route api/menus
   * @return {Object} returns a newable instance of the Menu Class
   */
  var Menu = function(Restangular) {
    var nearbyFilter;
    nearbyFilter = "";

    var instance = {
      get: get,
      find: find,
      create: create,
      update: update,
      destroy: destroy,
      getByLocation: getByLocation
    }

    return instance;

    function get() {
      return Restangular.all('menus').getList();
    }
    function find(id) {
      return Restangular.one('menus', id).get();
    }
    function create(data){
      return Restangular.all('menus').post(data);
    }
    function update(id, data){
      return Restangular.one('menus', id).put(data);
    }
    function destroy(id){
      return Restangular.one('menus', id).delete();
    }
    function getByLocation(data, cb, filter) {
      if (filter) {
        nearbyFilter = filter;
      }
      if (filter === "empty") {
        nearbyFilter = "";
      }
      data.val = nearbyFilter;
      return Restangular.all('menus').all('location').post(data);
    }

  };

  /**
   * Cache for recently searched Menus
   * @return {Object}  returns a newable instance for a Cache with get post update and delete
   */

  var MenuCache = function() {
    var _cache;
    _cache = {};
    return {
      get: function(key) {
        var result;
        result = false;
        if (_cache[key]) {
          return _cache[key];
        }
        return result;
      },
      set: function(key, obj) {
        return _cache[key] = obj;
      }
    };
  };


  Menu.$inject = ['Restangular'];
  return angular.module('app.factory.menu', []).factory('Menu', Menu).service('MenuCache', MenuCache);
})();
