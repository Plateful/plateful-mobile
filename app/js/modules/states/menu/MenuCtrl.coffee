angular.module('clurtch.modules.states.menu')

.controller('MenuCtrl', [
  '$rootScope'
  '$scope'
  '$stateParams'
  'Business'
  'MenuItem'
  '$ionicModal'
  '$ionicLoading'
  '$compile'
  ($rootScope, $scope, $stateParams, Business, MenuItem, $ionicModal, $ionicLoading, $compile) ->
    $scope.businessId = $stateParams.businessId


    $scope.priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]
    $scope.items = []
    $scope.newItem = {}

    ###### Modal for creating a new Item for the Menu

    $ionicModal.fromTemplateUrl(
      'js/modules/states/menu/modals/createItemModal.html'
      scope: $scope
      animation: 'slide-in-up'
    ).then((modal) ->
      $scope.createModal = modal
    )

    ###### Open and close the Modal
    $scope.openModal = ()->
      $scope.createModal.show()

    $scope.closeModal = ()->
      $scope.createModal.hide()


    $scope.addNewItem = (item)->
      # console.log distance, prices

    ###### Initialize the Google Maps API
    # Currently not working
    # initialize = ()->
    #   latlng = new google.maps.LatLng(-34.397, 150.644)
    #   myOptions = {
    #     zoom: 8,
    #     center: latlng,
    #     mapTypeId: google.maps.MapTypeId.ROADMAP
    #   }
    #   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)
    #   $scope.map = map
    #
    # ionic.Platform.ready(initialize)

])
.controller('addItemCtrl', ($rootScope, $scope, MenuItem)->
  # console.log $rootScope.viewingBusinessId
  $scope.newReview = {}
  $scope.addItem = ()->
    console.log $scope.newReview
    $rootScope.addNewItem($scope.newReview)
)
