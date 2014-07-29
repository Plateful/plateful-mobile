angular.module('app.modules.states.menu')

.controller('MenuCtrl', [
  '$rootScope'
  '$scope'
  '$stateParams'
  'Business'
  'MenuItem'
  '$ionicModal'
  '$ionicLoading'
  '$compile'
  ($rootScope, $scope, $stateParams, Business, MenuItem, $ionicModal, $ionicLoading, $compile) ->
    $scope.businessId = $stateParams.businessId
    $scope.locate = window.currLocation.coords
    $scope.images = [
      'http://www.listing99.com/images/showcase/1400572578_Dining-512.png',
      'http://www.hindustantimes.com/Images/popup/2012/11/delhi_food_new.jpg',
      'http://www.hindustantimes.com/Images/popup/2012/11/bombay_food.jpg',
      'https://pbs.twimg.com/media/Bcgct8rCMAE7Cvl.png',
      'http://d2ch1jyy91788s.cloudfront.net/dinewise/images/product/7153_CPPkg_10Off-430_430.jpg',
      'http://momadvice.com/blog/wp-content/uploads/2012/06/summer_dinner_inspiration_2.jpg?w=750&mode=max',
      'http://thewifewithaknife.com/wp-content/uploads/2014/04/frittata2.jpg',
      'http://www.surlatable.com/images/customers/c1079/CFA-190675/generated/CFA-190675_Default_1_430x430.jpg',
      'http://www.levyrestaurants.co.uk/uploads/20120203151004.jpg',
      'http://www.timing-design.com/food/eest1-6.jpg',
      'http://www.houseofbarbecue.com/wp-content/uploads/2014/06/Porterhouse-Steaks-14-Oz-2-0.jpg',
      'http://www.surlatable.com/images/customers/c1079/REC-235732/generated/REC-235732_Default_1_430x430.jpg',
      'http://us.123rf.com/450wm/rez_art/rez_art1209/rez_art120900051/15529230-salmon-steak-dinner-with-herbs-and-roasted-potatoes.jpg',
      'http://www.surlatable.com/images/customers/c1079/CFA-878751/generated/CFA-878751_Default_1_430x430.jpg',
      'http://www.surlatable.com/images/customers/c1079/CFA-878728/generated/CFA-878728_Default_1_430x430.jpg',
      'http://www.surlatable.com/images/customers/c1079/PRO-593426/generated/PRO-593426_Default_1_430x430.jpg',
      'http://www.surlatable.com/images/customers/c1079/CFA-878769/generated/CFA-878769_Default_1_430x430.jpg',
      'http://www.surlatable.com/images/customers/c1079/CFA-905208/generated/CFA-905208_Default_1_430x430.jpg',
      'http://www.surlatable.com/images/customers/c1079/PRO-192962/generated/PRO-192962_Default_1_430x430.jpg',
      'http://www.tedhickman.com/wp-content/uploads/2013/05/2013obama.png',
      'http://www.surlatable.com/images/customers/c1079/PRO-1101054/generated/PRO-1101054_Default_1_430x430.jpg',
      'http://www.noplainjaneskitchen.com/wp-content/uploads/2012/03/Brownie-Ice-Cream-Fados.png',
    ]


    ###### Initiate Menu call
    Business.find($scope.businessId).then (data)->
      console.log data
      $scope.business = data
      from = new google.maps.LatLng($scope.locate.latitude, $scope.locate.longitude)
      to   = new google.maps.LatLng(data.lat, data.long)
      dist = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.000621371192
      $scope.business.dist = dist - dist % 0.001

    ###### Modal for creating a new Item for the Menu



    $ionicModal.fromTemplateUrl(
      'js/modules/states/menu/modals/createItemModal.html'
      scope: $scope
      animation: 'slide-in-up'
    ).then((modal) ->
      $scope.createModal = modal
    )

    ###### Open and close the Modal
    $scope.openModal = ()->
      $scope.createModal.show()

    $scope.closeModal = ()->
      $scope.createModal.hide()


    $scope.addNewItem = (item)->
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


    $scope.priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]
    $scope.items = []
    $scope.newItem = {}

])
.controller('addItemCtrl', ($rootScope, $scope, MenuItem)->
  # console.log $rootScope.viewingBusinessId
  $scope.newReview = {}
  $scope.addItem = ()->
    console.log $scope.newReview
    $rootScope.addNewItem($scope.newReview)
)
