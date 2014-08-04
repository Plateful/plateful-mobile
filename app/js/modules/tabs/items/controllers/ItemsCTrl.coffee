(->
  ItemsCtrl = ($scope, $ionicModal, MenuItem, Menu, ImagesService) ->

    # Initialize $scope as @
    @initialize = =>
      @locate = window.currLocation.coords

      @images = ImagesService.get()

      @locationData = {
        lat: @locate.latitude
        lng: @locate.longitude
      }

      @querySearch = querySearch

      getMenuItems(null).then (data) =>
        @items = data
        return

      @closeModal = closeModal
      @openModal = openModal

    ###################
    # functions
    #
    getMenuItems = (filter) =>

      MenuItem.getByLocation @locationData, null

    querySearch = (itemsFilter) =>

      itemsFilter = itemsFilter or "empty"

      MenuItem
        .getByLocation(@locationData, itemsFilter)
        .then (data) =>
          @items = newData
          return

    initializeModal = =>
      $ionicModal
        .fromTemplateUrl("js/modules/tabs/find/modals/filterModal.html",
          scope: $scope
          animation: "slide-in-up"
        )
        .then (modal) =>
          @filterModal = modal
          return


    openModal = =>

      @filterModal.show()

    closeModal = =>

      @filterModal.hide()



    @initialize()
    return
  ItemsCtrl.$inject = [
    "$scope"
    "$ionicModal"
    "MenuItem"
    "Menu"
    "ImagesService"
  ]
  angular.module("app").controller "ItemsCtrl", ItemsCtrl
  return
)()


# ItemsCtrl = ($scope, $ionicModal, MenuItem, Menu, ImagesService)->
#
#   $scope.locate = window.currLocation.coords
#   $scope.images = ImagesService.get()
#   $scope.locationData = {lat: $scope.locate.latitude,lng: $scope.locate.longitude}
#
#   MenuItem.getByLocation($scope.locationData, null)
#     .then (data)=>
#       $scope.items = data
#
#   $scope.querySearch = (itemsFilter)->
#     itemsFilter = itemsFilter or "empty"
#     MenuItem.getByLocation($scope.locationData, itemsFilter)
#       .then (data)=>
#         $scope.items = newData
#
#   $ionicModal.fromTemplateUrl(
#     'js/modules/tabs/find/modals/filterModal.html',
#       scope: $scope
#       animation: 'slide-in-up'
#     ).then((modal) ->
#       $scope.filterModal = modal
#     )
#
#   $scope.openModal = ()->
#     $scope.filterModal.show()
#
#   $scope.closeModal = ()->
#     $scope.filterModal.hide()
#
# ItemsCtrl.$inject = ['$scope', '$ionicModal', 'MenuItem', 'Menu', 'ImagesService']
# angular
#   .module('app')
#   .controller 'ItemsCtrl', ItemsCtrl
