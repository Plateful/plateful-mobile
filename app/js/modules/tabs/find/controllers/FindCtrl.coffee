angular.module('clurtch.modules.tabs.find.controllers', [])


.controller('FindCtrl', [
  '$scope'
  '$ionicModal'
  'MenuItem'
  'Business'
  ($scope, $ionicModal, MenuItem, Business)->

    MenuItem.get().getList().then (items)->
      $scope.items = items
      makeStars()

    # Convert each items rating to a star value
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


    $scope.searchFilter = (distance, prices)->

      MenuItem.get()
        .then( (data)->
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
])
