angular.module('clurtch.modules.states.menu')

.controller('MenuCtrl', [
  '$rootScope'
  '$scope'
  '$stateParams'
  '$http'
  'ServerUrl'
  'Business'
  'MenuItem'
  ($rootScope, $scope, $stateParams, $http, ServerUrl, Business, MenuItem) ->
    $scope.businessId = $stateParams.businessId
    $scope.review = {}
    $http.get(ServerUrl + 'api/businesses/' + $scope.businessId)
      .success((data) ->
        $scope.business = data
      )
    MenuItem.getByBusiness($scope.businessId)
      .success (data)->
        console.log data
        $scope.items = data
      .error (err)->
        throw err

    # socket.on('thing:save', (data)->
    #   $scope.items.push(data)
    # )
    $rootScope.addNewItem = (review)->
      # $rootScope.addNewItem(review)
      review.business_id = $scope.businessId
      review.user_id = '53c5cf5c80a3c64a2669c8da'
      review.created_at = new Date()
      console.log(review)
      MenuItem.create(review)
        .success (data)->
          console.log(data)
          # $rootScope.newReview = {}
        .error (data)->
          console.log(data)
          throw data
])
.controller('addItemCtrl', ($rootScope, $scope, MenuItem)->
  # console.log $rootScope.viewingBusinessId
  $scope.newReview = {}
  $scope.addItem = ()->
    console.log $scope.newReview
    $rootScope.addNewItem($scope.newReview)
)
