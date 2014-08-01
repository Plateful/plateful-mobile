(->

  MenuCtrl = ($rootScope, $scope, $stateParams, Menu, MenuItem, $ionicModal, $ionicLoading, $compile, ImagesService) ->
    @menu_id = $stateParams.menu_id
    @locate = window.currLocation.coords
    @images = ImagesService.get()

    ###### Initiate Menu call
    Menu
      .find($scope.menu_id)
      .then (data)=>

        @menu = data
        from = new google.maps.LatLng(@locate.latitude, @locate.longitude)

        to   = new google.maps.LatLng(data.lat, data.long)

        dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192

        @menu.dist = dist - dist % 0.001

    ###### Modal for creating a new Item for the Menu

    $ionicModal.fromTemplateUrl(
      'js/modules/states/menu/modals/createItemModal.html'
      scope: $scope
      animation: 'slide-in-up'
    ).then((modal) =>
      @createModal = modal
    )

    ###### Open and close the Modal
    @openModal = ()=>
      @createModal.show()
    @closeModal = ()=>
      @createModal.hide()
    @addNewItem = (item)=>
      # console.log distance, prices
    ###### Initialize the Google Maps API
    # Currently not working
    # initialize = ()->
    #   latlng = new google.maps.LatLng(-34.397, 150.644)
    #   myOptions = {
    #     zoom: 8,
    #     center: latlng,
    #     mapTypeId: google.maps.MapTypeId.ROADMAP
    #   }
    #   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)
    #   $scope.map = map
    #
    # ionic.Platform.ready(initialize)
    @priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]
    @items = []
    @newItem = {}



    return

  addItemCtrl = ($rootScope, $scope, MenuItem)->
    # console.log $rootScope.viewingBusinessId
    $scope.newReview = {}
    $scope.addItem = ()->
      console.log $scope.newReview
      $rootScope.addNewItem($scope.newReview)

    return

  MenuCtrl.$inject = ['$rootScope','$scope','$stateParams','Menu','MenuItem','$ionicModal','$ionicLoading','$compile','ImagesService']
  addItemCtrl.$inject = ['$rootScope', '$scope', 'MenuItem']
  angular
    .module('app.modules.states.menu')
    .controller('MenuCtrl', MenuCtrl)
    .controller('addItemCtrl', addItemCtrl)
)()
