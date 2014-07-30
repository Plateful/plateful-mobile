angular.module('app.modules.states.map.controllers')


.controller('MenusMapCtrl', ($scope, $ionicLoading, $compile, MenusData)->

  $scope.rand = Math.random()
  console.log $scope.rand
  $scope.locations = MenusData.get()
  initialize = ()->
    $scope.locate = window.currLocation.coords

    myLatlng = new google.maps.LatLng($scope.locate.latitude,$scope.locate.longitude)

    mapOptions =
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    map = new google.maps.Map(document.getElementById("nearbyMap"), mapOptions)

    # //Marker + infowindow + angularjs compiled ng-click
    contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>"
    compiled = $compile(contentString)($scope)

    infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    })


    for item in $scope.locations
      loc = new google.maps.LatLng(item.geometry.location.k, item.geometry.location.B)
      marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: item.name
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
