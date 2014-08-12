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
      getByLocation: getByLocation,
      getMenuItems: getMenuItems
    };

    return instance;

    /**
     * @name    get
     * @return  Restangular promise to retrieve all menus
     * @GET:    /menus
     */
    function get() {
      return Restangular.all('menus').getList();
    }
    /**
     * @name    find
     * @param   {Number} id  menu._id
     * @return  Restangular promise to retrieve a single menu by id
     * @GET:    /menus/:_id
     */
    function find(id) {
      return Restangular.one('menus', id).get();
    }
    /**
     * @name    create
     * @param   {Object} data   new menu data
     * @return  Restangular promise to retrieve create a menu
     * @POST:    /menus
     */
    function create(data){
      return Restangular.all('menus').post(data);
    }
    /**
     * @name    update
     * @param   {Number} id    menu._id of updated menu
     * @param   {Object} data  changes made to the updated menu
     * @return  Restangular promise to update all menus
     * @GET:    /menus
     */
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
    function getMenuItems(id){
      return Restangular.one('menus', id).all('items').getList();
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
  return angular.module('app.model.menu', []).factory('Menu', Menu).service('MenuCache', MenuCache);
})();
