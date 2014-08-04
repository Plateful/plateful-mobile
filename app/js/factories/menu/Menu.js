(function() {
  (function() {

    /**
     * Menu Model Factory for interacting with REST Route api/menus
     * @return {Object} returns a newable instance of the Menu Class
     */
    var Menu, MenuCache;
    Menu = function(Restangular) {
      var nearbyFilter;
      nearbyFilter = "";
      return {
        getByLocation: function(data, cb, filter) {
          if (filter) {
            nearbyFilter = filter;
          }
          if (filter === "empty") {
            nearbyFilter = "";
          }
          data.val = nearbyFilter;
          return Restangular.all('menus').all('location').post(data);
        },
        find: function(id) {
          return Restangular.one('menus', id).get();
        }
      };
    };

    /**
     * Cache for recently searched Menus
     * @return {Object}  returns a newable instance for a Cache with get post update and delete
     */
    MenuCache = function() {
      MenuCache = function() {
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
      return MenuCache;
    };
    Menu.$inject = ['Restangular'];
    return angular.module('app.factory.menu', []).factory('Menu', Menu).service('MenuCache', MenuCache);
  })();

}).call(this);
