angular.module('clurtch.states', [
  'clurtch.states.search'
  'clurtch.states.camera'
  'clurtch.states.camera'
])

.config( ($stateProvider)->
  $stateProvider
    .state('search',
      url: '/search'
      templatesUrl: '/js/components/nav/search/search.html'
    )
 )
