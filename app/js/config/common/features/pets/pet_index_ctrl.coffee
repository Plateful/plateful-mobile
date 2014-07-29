angular.module "app"

# A simple controller that fetches a list of data from a service
.controller "PetIndexCtrl", ($scope, PetService, $http) ->
  $http.get('http://localhost:9000/api/users')
    .success (data)->
      console.log data
  $scope.pets = PetService.all()
