(->

  ReviewCtrl = ($scope, CreateReview, Menu)->
    # window.currLocation from the background Geo Location
    @locate = window.currLocation.coords

    # set the data to pass into the Menu Service
    #  Menu service takes (data, callback, searchValue)
    LocationData = {
      lat: @locate.latitude,
      lng:@locate.longitude
    }
    Menu
      .getByLocation(LocationData, null)
      .then (data)->
        @menus = data


    @newSearch = (nearbyFilter)->
      # in order to reset the cache filter
      # set the search filter to "empty" if empty
      menuFilter = menuFilter or "empty"

      Menu
        .getByLocation(LocationData, nearbyFilter)
        .then (data)->
          
          @menus = data

    return


  ReviewCtrl
    .$inject = ['$scope','CreateReview','Menu']
  angular
    .module('app.modules.tabs.review.controllers', [])
    .controller('ReviewCtrl', ReviewCtrl)
)()
