angular.module('clurtch.factory.item', [])

.factory 'MenuItem', ($http, ServerUrl)->
  get: ()->
    $http.get(ServerUrl + 'api/items')
  getByLocation: (location)->
    $http.post(ServerUrl + 'api/items/location', location)
  getByBusiness: (business_id)->
    $http.get(ServerUrl + 'api/items/business/' + business_id)
  getByUser: (user_id)->
    $http.get(ServerUrl + 'api/items/user/' + user_id)
  find: (id)->
    $http.get(ServerUrl + 'api/items/' + id)
  create: (data)->
    $http.post(ServerUrl + 'api/items', data)
  destroy: (id)->
    $http.delete(ServerUrl + 'api/items/' + id)
