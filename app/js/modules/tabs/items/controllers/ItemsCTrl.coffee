angular.module('app.modules.tabs.items.controllers', [])

.controller('ItemsCtrl', [
  '$scope'
  '$ionicModal'
  'MenuItem'
  'Business'
  'ImagesService'
  ($scope, $ionicModal, MenuItem, Business, ImagesService)->


    # ImagesService.get returns an array of images

    $scope.images = ImagesService.get()



    # window.currLocation from the background Geo Location
    $scope.locate = window.currLocation.coords


    # set the data to pass into the Business Service
    #  Business service takes (data, callback, searchValue)

    LocationData = {lat: $scope.locate.latitude,lng: $scope.locate.longitude}


    # If items exhist in the MenuItems cache storage the retrieve them
    $scope.items = MenuItem.getStorage()



    MenuItem.getByLocation(LocationData, (newData, key)->
      console.log newData
      $scope.findFilter = key
      $scope.items = newData
      makeStars()
      findDistance()
    )

    ###

      newSearch is called when from the search bar.
      The model value of the input field is passed in as findFilter

    ###

    $scope.newSearch = (findFilter)->
      # in order to reset the cache filter
      # set the search filter to "empty" if empty
      findFilter = findFilter or "empty"
      MenuItem.getByLocation(LocationData, (newData, key)->
        $scope.findFilter = key
        $scope.items = newData
        makeStars()
        findDistance()
      , findFilter)

    findDistance = ->
      from = new google.maps.LatLng($scope.locate.latitude, $scope.locate.longitude)
      for item in $scope.items
        to   = new google.maps.LatLng(item.venue.lat, item.venue.long)
        dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192
        item.dist = dist - dist % 0.001
    # Convert each items rating to a star value
    makeStars = ->
      for item in $scope.items
        item.image_url = $scope.images[Math.floor(Math.random() * $scope.images.length)]
        console.log Math.random() * $scope.images.length
        # MenuItem.set(item.id, item)
        # item.image_url = $scope.images


    # Filter Modal for selecting search filter options

    # $ionicModal.fromTemplateUrl(
    # 'js/modules/tabs/find/modals/filterModal.html',
    #   scope: $scope
    #   animation: 'slide-in-up'
    # ).then((modal) ->
    #   $scope.filterModal = modal
    # )

    $scope.openModal = ()->

      $scope.filterModal.show()

    $scope.closeModal = ()->

      $scope.filterModal.hide()


    # $scope.searchFilter = (distance, prices)->
    #
    #   MenuItem.get()
    #     .then( (data)->
    #       $scope.items = data
    #       makeStars()
    #     )
    #
    #   $scope.closeModal()

    # Creating filters options for filter modal


    $scope.distanceOptions = [
      {id: 1, title: '2 blocks', active: false}
      {id: 2, title: '6 blocks', active: false}
      {id: 3, title: '1 mile', active: false}
      {id: 4, title: '5 miles', active: false}
    ]
    $scope.priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]
])
