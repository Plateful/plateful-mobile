angular.module('clurtch.components.tabs.nearby.services', [])

.service 'Yelp', ['$http'
  ($http)->
    get: ->
      $http.get 'http://localhost:9000/api/businesses'
]
