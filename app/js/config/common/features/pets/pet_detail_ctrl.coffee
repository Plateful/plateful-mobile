angular.module "app"

# A simple controller that shows a tapped item's data
.controller "PetDetailCtrl", ($scope, $stateParams, PetService) ->
  $scope.pet = PetService.get($stateParams.petId)
