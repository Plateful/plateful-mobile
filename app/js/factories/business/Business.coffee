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
  'Restangular'
  (Rest)->
    # Global nearby filter input value
    nearbyFilter = ""
    getByLocation: (data, cb, filter)->
      # if filter then set the global filter to its value
      if filter then nearbyFilter = filter
      # if filter is "empty" set the global filter to ""
      if filter is "empty" then nearbyFilter = ""
      # set the search value on data before sending to the server
      data.val = nearbyFilter
      # url: POST - api/businesses/location
      Rest.all('menus').all('location').post(data).then (result)->
        cb(result, nearbyFilter)

    find: (id)->
      Rest.one('businesses', id)

]
