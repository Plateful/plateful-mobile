
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


###*
 * Menu Model Factory for interacting with REST Route api/menus
 * @return {Object} returns a newable instance of the Menu Class
###
Menu = ()->
  # Global nearby filter input value
  nearbyFilter = ""
  ###*
   * [getByLocation Restangular call on menus/ and caches the most recent search value
   * to pass on to the next state]
   * @param {object}   data   [the latitude and longitude and any other search values]
   * @param {Function} cb     [callback when the request is complete]
   * @param {string}   filter [description]
  ###
  getByLocation: (data, cb, filter)->
    if filter then nearbyFilter = filter
    if filter is "empty" then nearbyFilter = ""
    data.val = nearbyFilter
    Restangular.all('menus').all('location').post(data)

  ###*
   * [find HTTP GET http://localhost:9000/api/v1/menus/:id]
   * @param  {Number} id [id value for the menu]
   * @return {Object}    returns a promise
  ###
  find: (id)->
    Restangular.one('menus', id).get()



Menu.$inject = ['Restangular']
angular
  .module('app.factory.menu', [])
  .service('MenuCache', MenuCache)
  .factory('Menu', Menu)
