angular.module('clurtch.components.geo')

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
