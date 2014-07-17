angular.module('clurtch.modules.tabs.nearby.services', [])

.service 'Yelp', ['$http'
  ($http)->
    get: ->
      $http.get 'http://localhost:9000/api/businesses'
]
