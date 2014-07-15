angular.module('clurtch.components.tabs.find.services', [])


# .service 'FindServices', [
#   ()->
# ]

.service 'Yelp', ['$http'
  ($http)->
    get: ->
      $http.get 'http://localhost:9000/api/businesses'
]

.service 'SortTwoColumns', [
  ->
    sortTwoColumns = (array) ->
      result = []
      for index, item in array
        if not index % 2
          tuple = []
          tuple.push item
        else
          tuple.push item
          result.push tuple
      result
]
