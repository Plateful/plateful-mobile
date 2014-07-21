angular.module('clurtch.modules.states.menu')

.controller('MenuCtrl', [
  '$rootScope'
  '$scope'
  '$stateParams'
  '$http'
  'ServerUrl'
  'Business'
  'MenuItem'
  '$ionicModal'
  '$ionicLoading'
  ($rootScope, $scope, $stateParams, $http, ServerUrl, Business, MenuItem, $ionicModal, $ionicLoading) ->
    $scope.businessId = $stateParams.businessId
    $ionicLoading.show(
      noBackdrop: true,
      duration: 2000,
      template: 'Loading...'
    )
    $scope.priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]
    $scope.items = []
    $scope.newItem = {}
    Business.find($scope.businessId)
      .success((data) ->
        console.log "neo----", data[0][1]
        $scope.business = data[0][0]
        if Array.isArray(data[0][1])
          $scope.items = data[0][1]
          console.log $scope.items
        else
          $scope.items.push(data[0][1])
          # $scope.$apply()
        $ionicLoading.hide()
      )



    #
    # MenuItem.get()
    #   .success (data)->
    #     # console.log data
    #     # $scope.items = data
    #   .error (err)->
    #     throw err

    # socket.on('thing:save', (data)->
    #   $scope.items.push(data)
    # )
    $ionicModal.fromTemplateUrl(
      'js/modules/states/menu/modals/createItemModal.html'
      scope: $scope
      animation: 'slide-in-up'
    ).then((modal) ->
      $scope.createModal = modal
    )
    $scope.openModal = ()->
      $scope.createModal.show()

    $scope.closeModal = ()->
      $scope.createModal.hide()

    $scope.addNewItem = (item)->
      # console.log distance, prices
      item.business_id = $scope.businessId
      item.user_id = '53c5cf5c80a3c64a2669c8da'
      item.created_at = new Date()
      console.log(item)
      MenuItem.create(item)
        .success (data)->
          console.log(data)
          # $rootScope.newReview = {}
        .error (data)->
          console.log(data)
          throw data


      # Business.get()
      #   .success( (data)->
      #     $scope.items = data
      #   )

      $scope.closeModal()
    # $rootScope.addNewItem = (review)->
    #   # $rootScope.addNewItem(review)
])
.controller('addItemCtrl', ($rootScope, $scope, MenuItem)->
  # console.log $rootScope.viewingBusinessId
  $scope.newReview = {}
  $scope.addItem = ()->
    console.log $scope.newReview
    $rootScope.addNewItem($scope.newReview)
)
