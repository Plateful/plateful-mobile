findDistance = ()->
  locate = window.currLocation.coords
  from = new google.maps.LatLng(locate.latitude, locate.longitude)
  get: (item)->
    to   = new google.maps.LatLng(item.venue.lat, item.venue.long)
    dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192
    return item.dist = dist - dist % 0.001

angular
  .module('app')
  .service('findDistance', findDistance)
