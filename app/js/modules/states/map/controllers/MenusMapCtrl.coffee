angular.module('app.modules.states.map.controllers')


.controller('MenusMapCtrl', ($scope, $ionicLoading, $compile)->

  $scope.rand = Math.random()
  console.log $scope.rand
  initialize = ()->


    myLatlng = new google.maps.LatLng(43.07493,-89.381388)

    mapOptions =
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    map = new google.maps.Map(document.getElementById("nearbyMap"), mapOptions)

    # //Marker + infowindow + angularjs compiled ng-click
    contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>"
    compiled = $compile(contentString)($scope)

    infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    })

    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    })

    google.maps.event.addListener(marker, 'click', ()->
      infowindow.open(map,marker)
    )

    $scope.map = map

  ionic.Platform.ready(initialize)

  $scope.centerOnMe = ()->
    unless $scope.map then return

    $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    })

    navigator.geolocation.getCurrentPosition( (pos)->
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
      $ionicLoading.hide()
      # $scope.loading.hide()
    , (error)->
      alert('Unable to get location: ' + error.message)
    )


  $scope.clickTest = ()->
    alert('Example of infowindow with ng-click')

)
