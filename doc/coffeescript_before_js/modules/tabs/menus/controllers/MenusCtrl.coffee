(->
  ###
   * @name   MenusCtrl
   * @desc   Controller for the menus tab
   *         Start off the google search by looking up businesses within our current location
   * @test1  test to see if @locations has data
   * @test2  test to see if @locate is equal to our current longitude and latitude
  ###
  MenusCtrl = ($scope, Menu, $timeout, $document, ngGPlacesAPI )->

    @initialize = =>
      ##############
      # $scope

      @locate = window.currLocation.coords

      # geocoder = new google.maps.Geocoder()

      @searchEventTimeout = undefined

      @searchInputElement = angular.element($document.find('#searchQuery'))

      @searchQuery = {vicinity: 'San Francisco', latitude:@locate.latitude, longitude:@locate.longitude}

      googleSearch(@searchQuery)
        .then (data)=>
          console.log data
          @locations = data
          return


    ##############
    # functions

    googleSearch = (query)->
      ngGPlacesAPI
        .nearbySearch(query)

    @initialize()
    return

  MenusCtrl.$inject = ['$scope', 'Menu','$timeout','$document','ngGPlacesAPI']
  angular
    .module('app.modules.tabs.menus.controllers', [])
    .controller('MenusCtrl', MenusCtrl)

)()
