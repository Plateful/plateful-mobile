angular.module('clurtch.factory.photo', [])

.factory 'Photo', ($http, ServerUrl)->

  find: (id)->
    $http.get(ServerUrl + 'api/photos/' + id)
  getUserAlbum: (user_id)->
    $http.post(ServerUrl + 'api/photos/album/' + user_id)
  getItemGallery: (item_id)->
    $http.get(ServerUrl + 'api/photos/gallery/' + item_id)
  # getByUser: (user_id)->
  #   $http.get(ServerUrl + 'api/items/user/' + user_id)
  # create: (data)->
  #   $http.post(ServerUrl + 'api/items', data)
  # destroy: (id)->
  #   $http.delete(ServerUrl + 'api/items/' + id)


# .controller "Ctrl", ["$scope", "Photo", ($scope, Photo)->
#   userId = $scope.userId
#   Photo.getUserAlbum($scope.userId)
#     .success (data)->
#       console.log data
# ]
