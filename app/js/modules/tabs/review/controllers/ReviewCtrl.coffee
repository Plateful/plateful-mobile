angular.module('clurtch.modules.tabs.review.controllers', [])

.service 'CreateReview', ()->
  review = {}

  get: (key)->
    if key then return review[key]
    review
  set: (key, val)->
    review[key] = val

.controller 'ReviewCtrl', [
  '$scope'
  'CreateReview'
  'Business'
  ($scope, CreateReview, Business)->
    Business.get()
      .success (data)->
        $scope.businesses = data

]

.controller 'ReviewItemCtrl', [
  '$scope'
  'CreateReview'
  'MenuItem'
  '$stateParams'
  ($scope, CreateReview, MenuItem, $stateParams)->
    $scope.businessId = $stateParams.businessId
    CreateReview.set('business', $scope.businessId)
    $scope.review = CreateReview.get()
    MenuItem.getByBusiness($scope.businessId)
      .success (data)->
        $scope.items = data

]

.controller 'createItemCtrl', [
  '$scope'
  'CreateReview'
  ($scope, CreateReview)->

]
.controller 'createReviewCtrl', [
  '$scope'
  'CreateReview'
  '$stateParams'
  'MenuItem'
  'Business'
  'Review'
  'ServerUrl'
  ($scope, CreateReview, $stateParams, MenuItem, Business, Review, ServerUrl)->
    $scope.itemId = $stateParams.itemId
    CreateReview.set('item_id', $scope.itemId)
    $scope.review = CreateReview.get()
    Business.find(CreateReview.get('business'))
      .success (data)->
        $scope.business = data
    MenuItem.find($scope.itemId)
      .success (data)->
        $scope.item = data

    $scope.rating = 0
    $scope.buttons = [1,2,3,4,5]
    $scope.setRate = (index)->
      if $scope.rating is index then $scope.rating = 0 else $scope.rating = index
      CreateReview.set('rating', $scope.rating)

    $scope.submitReview = ->
      imgUrl = CreateReview.get('image_url')
      # imgUrl = imgUrl.toURL()
      # Review.create(CreateReview.get())
      win = (r)->
        console.log("Code = " + r.responseCode)
        console.log("Response = " + r.response)
        # console.log("Sent = " + r.bytesSent)


      fail = (error)->
        alert("An error has occurred: Code = " + error.code)
        console.log("upload error source " + error.source)
        console.log("upload error target " + error.target)


      options = new FileUploadOptions()
      options.fileKey = "image_url"
      options.fileName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1)
      options.chunkedMode = false
      # options.fileName = 'image.jpg'
      options.mimeType = "image/jpeg"

      params = {}
      # params.business = CreateReview.get('business')
      # params.rating = CreateReview.get('rating')
      # params.value2 = "param";

      options.params = params
      console.log "Options", options

      ft = new FileTransfer()
      ft.upload(imgUrl, 'http://192.168.1.9:9000/api/reviews', win, fail, options)
      dd = new FileTransfer()
      dd.upload(imgUrl, encodeURI('http://192.168.1.9:9000/api/reviews'), win, fail, options)
      # console.log CreateReview.get()
]
