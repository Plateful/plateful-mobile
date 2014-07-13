angular.module('clurtch.models.user')

.service 'User', ($http)->
  get: ->
    $http.get('/api/users')
  post: (data)->
    $http.post('/api/users')
  update: (id, data)->
    $http.put('/api/users/' + id, data)
  destroy: (id)->
    $http.delete('/api/users/' + id)
