angular.module('ngPlaces', [])
.directive('ngPlaces', [
  '$ionicTemplateLoader'
  '$ionicBackdrop'
  '$q'
  '$timeout'
  '$rootScope'
  '$document'
  'ngGPlacesAPI'
  'MenusData'
  ($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $document, ngGPlacesAPI, MenusData)->
    return {
      require: '?ngModel',
      restrict: 'E',
      template: '<input type="text" readonly="readonly" class="ion-google-place" autocomplete="off">',
      replace: true,
      link: (scope, element, attrs, ngModel)->
        scope.locations = []
        scope.locate = window.currLocation.coords
        geocoder = new google.maps.Geocoder()
        searchEventTimeout = undefined

        POPUP_TPL = [
          '<div class="ion-google-place-container">',
            '<div class="bar bar-header bar-positive item-input-inset">',
              '<label class="item-input-wrapper">',
                '<i class="icon ion-ios7-search placeholder-icon"></i>',
                '<input id="searchQuery" class="google-place-search" type="search" ng-model="searchQuery" placeholder="Enter an address, place or ZIP code">',
              '</label>',
              '<button class="button button-clear">',
                'Cancel',
              '</button>',
            '</div>',
            '<ion-content class="has-header has-header">',
              '<ion-list>',
                '<ion-item ng-repeat="location in locations" type="item-text-wrap" ng-click="selectLocation(location)">',
                  '<h2>{{location.name}}</h2>',
                  # '<h4>{{location.vicinity}}</h4>',
                  # '{{location.formatted_address}}',
                '</ion-item>',
              '</ion-list>',
            '</ion-content>',
          '</div>'
        ].join('')

        popupPromise = $ionicTemplateLoader.compile({
            template: POPUP_TPL,
            scope: scope,
            appendTo: $document[0].body
        });

        popupPromise.then( (el)->

          searchInputElement = angular.element(el.element.find('input'))

          scope.selectLocation = (location)->
            ngModel.$setViewValue(location)
            ngModel.$render()
            el.element.css('display', 'none')
            $ionicBackdrop.release()


          scope.$watch('searchQuery', (query)->
            if searchEventTimeout then $timeout.cancel(searchEventTimeout)
            searchEventTimeout = $timeout( ()->
              unless query then return
              # if query.length < 3

              ngGPlacesAPI.nearbySearch({nearbySearchKeys: ['geometry'], name:query, reference:query, latitude:scope.locate.latitude, longitude:scope.locate.longitude})
                .then( (data)->
                  # scope.$apply(()->
                  # for item in data

                  MenusData.set(data)
                  console.log data
                  scope.locations = data
                  # )
                )

              # the lines below are for using the directve with google geocoder

              # geocoder.geocode({ address: query }, (results, status)->
              #   console.log(results)
              #   if status is google.maps.GeocoderStatus.OK
              #     scope.$apply(()->
              #       scope.locations = results
              #     )
              #   else
              #     # // @TODO: Figure out what to do when the geocoding fails
              #
              # )
            , 350)
            # // we're throttling the input by 350ms to be nice to google's API
          )

          onClick = (e)->
            e.preventDefault()
            e.stopPropagation()
            $ionicBackdrop.retain()
            el.element.css('display', 'block')
            searchInputElement[0].focus()
            setTimeout(()->
              searchInputElement[0].focus()
            ,0)


          onCancel = (e)->
            scope.searchQuery = ''
            $ionicBackdrop.release()
            el.element.css('display', 'none')


          element.bind('click', onClick)
          element.bind('touchend', onClick)

          el.element.find('button').bind('click', onCancel)
        )

        if attrs.placeholder
          element.attr('placeholder', attrs.placeholder);



        ngModel.$formatters.unshift((modelValue)->
          unless modelValue then return ''
          return modelValue
        )

        ngModel.$parsers.unshift( (viewValue)->
          return viewValue
        )

        ngModel.$render = ()->
          unless ngModel.$viewValue
            element.val('')
          else
            element.val(ngModel.$viewValue.formatted_address or '')



    }

])
