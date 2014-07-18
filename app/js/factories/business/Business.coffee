angular.module('clurtch.factory.business', [])

.factory 'Business', [
  '$http'
  'ServerUrl'
  ($http, ServerUrl)->
    get: ->
      $http.get ServerUrl + 'api/businesses'
    getWith: (id)->
      args = Array.prototype.slice.call(arguments)
      $http.post(ServerUrl + '/api/business/#{id}/', {args: args})
    find: (id)->
      $http.get ServerUrl + 'api/businesses/' + id
    post: (data)->
    update: (id, data)->
    destroy: (id)->
]
