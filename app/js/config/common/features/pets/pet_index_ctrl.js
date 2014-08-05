(function() {
  angular.module("app").controller("PetIndexCtrl", function($scope, PetService, $http) {
    $http.get('http://localhost:9000/api/users').success(function(data) {
      return console.log(data);
    });
    return $scope.pets = PetService.all();
  });

}).call(this);
