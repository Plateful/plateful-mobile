
angular.module('clurtch.models.user')

.service 'UsersService', ($http)->
  getFollowersByUser: (id)->
    $http.get('/api/user/#{id}/followers')
  getFollowingByUser: (id)->
    $http.get('/api/user/#{id}/following')
  getLikesByUser: (id)->
    $http.get('/api/user/#{id}/likes')
  getDislikesByUser: (id)->
    $http.get('/api/user/#{id}/dislikes')
  getReviewsByUser: (id)->
    $http.get('/api/user/#{id}/reviews')
  getImagesByUser: (id)->
    $http.get('/api/user/#{id}/images')
  getRatedByUser: (id)->
    $http.get('/api/user/#{id}/rates')
  getAllByUser: (id)->
    $http.get('/api/user/#{id}/all')
