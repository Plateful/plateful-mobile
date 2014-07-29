angular.module('app.modules.tabs.menus.services', [])

.service 'Yelp', ['$http'
  ($http)->
    get: ->
      $http.get 'http://localhost:9000/api/businesses'
]
