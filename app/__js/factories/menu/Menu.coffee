(->
  ###*
   * Menu Model Factory for interacting with REST Route api/menus
   * @return {Object} returns a newable instance of the Menu Class
  ###
  Menu = (Restangular)->
    # Global nearby filter input value
    nearbyFilter = ""
    getByLocation: (data, cb, filter)->
      if filter then nearbyFilter = filter
      if filter is "empty" then nearbyFilter = ""
      data.val = nearbyFilter
      Restangular.all('menus').all('location').post(data)
    find: (id)->
      Restangular.one('menus', id).get()


  ###*
   * Cache for recently searched Menus
   * @return {Object}  returns a newable instance for a Cache with get post update and delete
  ###
  MenuCache = ()->

    MenuCache = ()->
      _cache = {}
      get: (key)->
        result = false
        if _cache[key] then return _cache[key]
        result
      set: (key, obj)->
        _cache[key] = obj

    (MenuCache)


  Menu.$inject = ['Restangular']
  angular
    .module('app.factory.menu', [])
    .factory('Menu', Menu)
    .service('MenuCache', MenuCache)
)()
