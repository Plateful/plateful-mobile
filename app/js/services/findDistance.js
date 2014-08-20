(function() {
  (function() {
    var findDistance;
    findDistance = function() {
      var from, locate;
      locate = window.currLocation.coords;
      from = new google.maps.LatLng(locate.latitude, locate.longitude);
      return {
        get: function(lat, lng) {
          var dist, to;
          to = new google.maps.LatLng(lat, lng);
          dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192;
          return dist = dist - dist % 0.001;
        }
      };
    };
    return angular.module('app').service('findDistance', findDistance);
  })();

}).call(this);
