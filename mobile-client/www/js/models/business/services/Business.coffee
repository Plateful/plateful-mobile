angular.module('clurtch.models.business')



.service 'Business', [
  '$http'
  ($http)->
    get: ()->
    getWith: (id)->
      args = Array.prototype.slice.call(arguments)
      $http.post('/api/business/#{id}/', {args: args})
    post: (data)->
    update: (id, data)->
    destroy: (id)->
]
