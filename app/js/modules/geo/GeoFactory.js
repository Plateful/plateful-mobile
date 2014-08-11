(function() {
  var BackgroundGeo = function($q) {
    var from;

    current()
      .then(function(data){
        from = new google.maps.LatLng(data.latitude, data.longitude);
      })

    instance = {
      current: current,
      distance: distance
    };

    ///////////////

    function current(){
      var locator = $q.defer()
      locator.resolve(window.currLocation.coords)
      return locator.promise
    };
    function distance(lat, lng){
      var dist, to;
      to = new google.maps.LatLng(lat, lng);
      dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192;
      return Math.floor((dist + 0.005)*100) / 100

    }

    return instance;
  }
  BackgroundGeo
    .$inject = ['$q']
  angular
    .module('app.modules.geo', [])
    .factory('BackgroundGeo', BackgroundGeo)
})();
