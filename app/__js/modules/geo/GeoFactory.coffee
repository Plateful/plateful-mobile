angular.module('app.modules.geo')

.factory('Geo', [
  '$q'
  ($q) ->
    getLocation: ->
      q = $q.defer()
      navigator.geolocation.getCurrentPosition(
        (position) ->
          q.resolve position
        (error) ->
          q.reject error
      )
      q.promise
])
.factory('bGeo', [
  '$q'
  ($q) ->
    get: ->
      @bgGeo = window.backgroundGeoLocation

])
