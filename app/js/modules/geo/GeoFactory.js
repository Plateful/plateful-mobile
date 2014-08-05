(function() {
  angular.module('app.modules.geo').factory('Geo', [
    '$q', function($q) {
      return {
        getLocation: function() {
          var q;
          q = $q.defer();
          navigator.geolocation.getCurrentPosition(function(position) {
            return q.resolve(position);
          }, function(error) {
            return q.reject(error);
          });
          return q.promise;
        }
      };
    }
  ]).factory('bGeo', [
    '$q', function($q) {
      return {
        get: function() {
          return this.bgGeo = window.backgroundGeoLocation;
        }
      };
    }
  ]);

}).call(this);
