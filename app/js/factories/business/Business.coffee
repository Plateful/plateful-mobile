angular.module('clurtch.factory.business', [])

.factory 'Business', [
  '$http'
  'ServerUrl'
  'Geo'
  ($http, ServerUrl, Geo)->
    # self = @
    lat = 0
    lng = 0
    Geo.getLocation().then(
      (position) ->
        lat = position.coords.latitude
        lng = position.coords.longitude

      (error) ->
        console.log 'Unable to get current location: ' + error
    )
    get: ->
      $http.get ServerUrl + 'api/businesses'
    getWith: (id)->
      args = Array.prototype.slice.call(arguments)
      $http.post(ServerUrl + '/api/business/#{id}/', {args: args})
    getByLocation: (data)->

      $http.post ServerUrl + 'api/businesses/location', data
    find: (id)->
      $http.get ServerUrl + 'api/businesses/' + id
    post: (data)->
    update: (id, data)->
    destroy: (id)->
]
