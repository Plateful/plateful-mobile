(function() {
  (function() {
    var MenusMapCtrl;
    MenusMapCtrl = function($scope, $ionicLoading, $compile, MenusData) {
      var initialize;
      this.rand = Math.random();
      this.locations = MenusData.get();
      this.locate = window.currLocation.coords;
      initialize = (function(_this) {
        return function() {
          var compiled, contentString, infowindow, item, loc, map, mapOptions, marker, myLatlng, _i, _len, _ref;
          myLatlng = new google.maps.LatLng(_this.locate.latitude, _this.locate.longitude);
          mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById("nearbyMap"), mapOptions);
          contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
          compiled = $compile(contentString)(_this);
          infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });
          _ref = _this.locations;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            loc = new google.maps.LatLng(item.geometry.location.k, item.geometry.location.B);
            marker = new google.maps.Marker({
              position: loc,
              map: map,
              title: item.name
            });
            google.maps.event.addListener(marker, 'click', function() {
              return infowindow.open(map, marker);
            });
          }
          return _this.map = map;
        };
      })(this);
      ionic.Platform.ready(initialize);
      this.centerOnMe = function() {
        if (!this.map) {
          return;
        }
        $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        return navigator.geolocation.getCurrentPosition((function(_this) {
          return function(pos) {
            _this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            return $ionicLoading.hide();
          };
        })(this), function(error) {
          return alert('Unable to get location: ' + error.message);
        });
      };
      this.clickTest = function() {
        return alert('Example of infowindow with ng-click');
      };
    };
    MenusMapCtrl.$inject = ['$scope', '$ionicLoading', '$compile', 'MenusData'];
    return angular.module('app.modules.states.map.controllers').controller('MenusMapCtrl', MenusMapCtrl);
  })();

}).call(this);
