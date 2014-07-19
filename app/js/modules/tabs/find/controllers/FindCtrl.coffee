angular.module('clurtch.modules.tabs.find.controllers', [])


.controller('FindCtrl', [
  '$scope'
  '$ionicModal'
  'MenuItem'
  'Geo'
  ($scope, $ionicModal, MenuItem, Geo)->

    makeStars = ->
      for item in $scope.items
        tempRating = item.rating
        stars = ''
        while tempRating >= 1
          stars += '★'
          tempRating--
        if tempRating % 1 > 0
          stars += '½'
        item.stars = stars

    $ionicModal.fromTemplateUrl(
      'js/modules/tabs/find/modals/filterModal.html'
      scope: $scope
      animation: 'slide-in-up'
    ).then((modal) ->
      $scope.filterModal = modal
    )
    $scope.openModal = ()->
      $scope.filterModal.show()

    $scope.closeModal = ()->
      $scope.filterModal.hide()

    $scope.searchFilter = (distance, prices)->
      console.log distance, prices
      MenuItem.get()
        .success( (data)->
          $scope.items = data
          makeStars()
        )

      $scope.closeModal()

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
    # Grab data from Yelp then load numeric ratings as stars
    MenuItem.get().success (data) ->
      $scope.items = data
      console.log 'this is the business data', data
      makeStars()
      # socket.syncUpdates('Item') = $scope.items
      # Convert rating to stars in unicode

    # Get the latitude and longitude of the user when app find tab loads
    Geo.getLocation().then(
      (position) ->
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        console.log $scope.lat, $scope.lng
      (error) ->
        console.log 'Unable to get current location: ' + error
    )


])
