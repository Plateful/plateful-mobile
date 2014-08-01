(->
  MenusMapCtrl = ($scope, $ionicLoading, $compile, MenusData)->

    @rand = Math.random()

    @locations = MenusData.get()
    @locate = window.currLocation.coords

    initialize = ()=>

      myLatlng = new google.maps.LatLng(@locate.latitude,@locate.longitude)

      mapOptions =
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP

      map = new google.maps.Map(document.getElementById("nearbyMap"), mapOptions)

      # //Marker + infowindow + angularjs compiled ng-click
      #
      contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>"

      compiled = $compile(contentString)(@)

      infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      })

      for item in @locations

        loc = new google.maps.LatLng(item.geometry.location.k, item.geometry.location.B)

        marker = new google.maps.Marker({

          position: loc,
          map: map,
          title: item.name

        })


        google.maps.event.addListener(marker, 'click', ()->


          infowindow.open(map,marker)

        )

      @map = map


    ionic.Platform.ready(initialize)


    @centerOnMe = ()->


      unless @map then return


      $ionicLoading.show({

        content: 'Getting current location...',
        showBackdrop: false

      })

      navigator
        .geolocation
        .getCurrentPosition( (pos)=>

          @map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
          $ionicLoading.hide()
        # $scope.loading.hide()
        , (error)->

          alert('Unable to get location: ' + error.message)

        )

    @clickTest = ()->
      alert('Example of infowindow with ng-click')

    return

  MenusMapCtrl
    .$inject = ['$scope', '$ionicLoading', '$compile', 'MenusData']
  angular
    .module('app.modules.states.map.controllers')
    .controller('MenusMapCtrl', MenusMapCtrl)
)()
