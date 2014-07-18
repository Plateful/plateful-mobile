angular.module('clurtch.factory.user', [])

.service 'User', ($http, ServerUrl)->
  get: ()->
    $http.get(ServerUrl + 'api/users')
  post: (data)->
    $http.post(ServerUrl +'api/users')
  update: (id, data)->
    $http.put(ServerUrl + 'api/users/' + id, data)
  destroy: (id)->
    $http.delete(ServerUrl + 'api/users/' + id)
  find: (id)->
    $http.get(ServerUrl + 'api/users/' + id)
