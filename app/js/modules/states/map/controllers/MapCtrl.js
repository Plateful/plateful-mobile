(function() {
  (function() {
    var MapCtrl;
    MapCtrl = function($scope, $ionicLoading, $compile) {
      var callback, createMarker;
      this.initialize = (function(_this) {
        return function() {
          map;
          service;
          infowindow;
          var compiled, contentString, infowindow, map, mapOptions, marker, myLatlng, request, service;
          myLatlng = new google.maps.LatLng(43.07493, -89.381388);
          mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById("map"), mapOptions);
          contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
          compiled = $compile(contentString)(_this);
          infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });
          marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });
          google.maps.event.addListener(marker, 'click', function() {
            return infowindow.open(map, marker);
          });
          request = {
            location: myLatlng,
            radius: '500',
            types: ['store']
          };
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
          return _this.map = map;
        };
      })(this);
      callback = function(results, status) {
        var item, place, _i, _len, _results;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          _results = [];
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            item = results[_i];
            place = item;
            console.log(item);
            _results.push(createMarker(item));
          }
          return _results;
        }
      };
      createMarker = function(place) {
        var marker, placeLoc;
        placeLoc = place.geometry.location;
        marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        return google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          return infowindow.open(map, this);
        });
      };

      /*
       * Invoke initialize on ionic platform.ready()
       */
      ionic.Platform.ready(this.initialize);
      $scope.centerOnMe = (function(_this) {
        return function() {
          if (!_this.map) {
            return;
          }
          $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
          });
          return navigator.geolocation.getCurrentPosition(function(pos) {
            _this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            return $ionicLoading.hide();
          }, function(error) {
            return alert('Unable to get location: ' + error.message);
          });
        };
      })(this);
      this.clickTest = function() {
        return alert('Example of infowindow with ng-click');
      };
    };
    MapCtrl.$inject = ['$scope', '$ionicLoading', '$compile'];
    return angular.module('app.modules.states.map.controllers', []).controller('MapCtrl', MapCtrl);
  })();

}).call(this);
