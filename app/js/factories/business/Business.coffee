angular.module('clurtch.factory.business', [])


.service 'BusinessCache', ()->
  _cache = {}
  instance =
    get: (key)->
      result = false
      if _cache[key] then return _cache[key]
      result
    set: (key, obj)->
      _cache[key] = obj
  instance



.factory 'Business', [
  '$http'
  'ServerUrl'
  'BusinessCache'
  ($http, ServerUrl, BusinessCache)->
    nearbyKey = ""
    get: ->
      $http.get ServerUrl + 'api/businesses'
    getWith: (id)->
      args = Array.prototype.slice.call(arguments)
      $http.post(ServerUrl + '/api/business/#{id}/', {args: args})


    getByLocation: (data, key, cb)->

      if key then nearbyKey = key
      cached = BusinessCache.get(nearbyKey)
      if cached then cb( nearbyKey, cached )
      else
        $http.post(ServerUrl + 'api/businesses/location', data)
          .success (newData)->
            BusinessCache.set(data.val, newData)
            cb(data.val, newData )


    find: (id)->
      $http.get ServerUrl + 'api/businesses/' + id
    post: (data)->
    update: (id, data)->
    destroy: (id)->
]
