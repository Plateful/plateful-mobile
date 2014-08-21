(function() {
  var MapCtrl;
  ItemMapCtrl = function($scope, $ionicLoading, $compile, ItemMapService, BackgroundGeo, $stateParams) {
    var callback, createMarker, MenuItem, vm;

    vm = this;
    vm.item_id = $stateParams.item_id;
    console.log(vm.item_id);
    MenuItem = ItemMapService.get(vm.item_id);
    console.log("MenusItem", MenuItem);

    vm.initialize = initialize;

    // BackgroundGeo
    //   .current()
    //   .then(function (data){
    //     ionic.Platform.ready(function(){
    //       vm.initialize(data.latitude, data.longitude)
    //     });
    //   })

    function initialize(){
      var map,service,infowindow;
      var compiled, contentString, infowindow, map, mapOptions, marker, itemMarker, myLatlng, itemLatlng, request, service;
      // myLatlng = new google.maps.LatLng(lat, lng);
      itemLatlng = new google.maps.LatLng(MenuItem.menu.latitude, MenuItem.menu.longitude);
      mapOptions = {
        center: itemLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      compiled = $compile(contentString)(vm);
      infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });
      // myMarker = new google.maps.Marker({
      //   position: myLatlng,
      //   map: map,
      //   title: 'Uluru (Ayers Rock)'
      // });
      itemMarker = new google.maps.Marker({
        position: itemLatlng,
        map: map,
        title: MenuItem.name
      });
      // google.maps.event.addListener(myMarker, 'click', function() {
      //   return infowindow.open(map, myMarker);
      // });
      google.maps.event.addListener(itemMarker, 'click', function() {
        return infowindow.open(map, itemMarker);
      });
      // request = {
      //   location: myLatlng,
      //   radius: '500',
      //   types: ['store']
      // };
      // service = new google.maps.places.PlacesService(map);
      // service.nearbySearch(request, callback);
      vm.map = map;
      return vm.map;

    }

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
    ionic.Platform.ready(vm.initialize);
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
  ItemMapCtrl.$inject = ['$scope', '$ionicLoading', '$compile', 'ItemMapService', 'BackgroundGeo', '$stateParams'];
  return angular.module('app.states.map.controllers', []).controller('ItemMapCtrl', ItemMapCtrl);
})();
