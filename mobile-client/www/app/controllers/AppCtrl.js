"use strict"
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.title = 'Hi'
  $http.get('http://localhost:9000/api/users')
    .success(function(data){
      console.log(data)
    })
})


.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
