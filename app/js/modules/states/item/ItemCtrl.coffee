(->
  ###
   * [ItemCtrl description]
   * @param {[type]} $scope        [description]
   * @param {[type]} $stateParams  [description]
   * @param {[type]} $http         [description]
   * @param {[type]} Item          [description]
   * @param {[type]} Review        [description]
   * @param {[type]} $ionicLoading [description]
   * @param {[type]} Rest          [description]
  ###
  ItemCtrl = ($scope, $stateParams, $http, Item, Review, $ionicLoading, Rest)->

    @item_id = $stateParams.itemId

    # Create a star rating for the item, based on the item's rating property
    makeStars = (rating)->
      '★★★★★½'.slice(5.75-rating, 6.25-Math.abs(rating%1-0.5))

    Item
      .find(@item_id)
      .then (data)->
        @item = data[0]
        @item.stars = makeStars(@item.rating)

    @item = Item.getStorage(@itemId)

    # As a user, I want to see all the photos of this item
    @showPhotos = ()->
      Item
        .getItemGallery(@item_id)
        .then (photos)->
          @photos = photos

    # As a user, I want to see all the reviews regarding this item
    @showReviews = ()->
      Item
        .getItemReviews(@item_id)
        .then (reviews)->
          @reviews = reviews

    # As a user, I want to share my experience with this item
    @reviewItem = ()->
      alert 'item reviewed'

    # As a user, I want to Collect this item
    @collectItem = ()->
      alert 'item collected'

    # As a user, I want to Bookmark this item
    @bookmarkItem = ()->
      alert 'item bookmarked'
  return

  ItemCtrl
    .$inject = ['$scope','$stateParams','$http','MenuItem','Review','$ionicLoading','Restangular']
  angular
    .module('app.modules.states.item')
    .controller('ItemCtrl', ItemCtrl)
)()
