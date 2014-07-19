angular.module('clurtch.factory.review', [])

.factory 'Review', ($http, ServerUrl)->
  get: (id)->
  getByBusiness: (business_id)->
    $http.get(ServerUrl + 'api/reviews/business/' + business_id)
  getByUser: (user_id)->
    $http.get(ServerUrl + 'api/reviews/user/' + user_id)
  find: (id)->
    $http.get(ServerUrl + 'api/reviews/' + id)
  create: (data)->
    $http.post(ServerUrl + 'api/reviews', data)
  destroy: (id)->
    $http.delete(ServerUrl + 'api/reviews/' + id)
  getByItemId: (item_id) ->
    $http.get(ServerUrl + 'api/reviews/item/' + item_id)
