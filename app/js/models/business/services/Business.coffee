angular.module('clurtch.models.business')

.service 'Business', [
  '$http'
  ($http)->
    get: ->
      $http.get 'http://localhost:9000/api/businesses'
    getWith: (id)->
      args = Array.prototype.slice.call(arguments)
      $http.post('/api/business/#{id}/', {args: args})
    post: (data)->
    update: (id, data)->
    destroy: (id)->
]
