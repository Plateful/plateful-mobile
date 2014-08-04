(->
  createReviewCtrl = ($scope, CreateReview, $stateParams, MenuItem, Menu, Review, ServerUrl)->

    @item_id = $stateParams.itemId

    CreateReview
      .set('item_id', @item_id)

    @review = CreateReview.get()

    Menu
      .find(CreateReview.get('menu'))
      .then (data)->
        @menu = data

    MenuItem
      .find(@item_id)
      .then (data)=>
        @item = data

    @rating = 0
    @buttons = [1,2,3,4,5]
    @setRate = (index)=>
      if @rating is index then @rating = 0 else @rating = index

      CreateReview.set('rating', @rating)

    $scope.submitReview = ->

      imgUrl = CreateReview.get('image_url')
      # imgUrl = imgUrl.toURL()
      # Review.create(CreateReview.get())

      win = (r)->

        console.log("Code = " + r.responseCode)
        console.log("Response = " + r.response)

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
      # options.mimeType = "text/plain"

      params = {}
      params.menu = CreateReview.get('menu')
      params.rating = CreateReview.get('rating')
      # params.value2 = "param";

      options.params = params
      # console.log "Options", options

      ft = new FileTransfer()
      ft.upload(imgUrl, encodeURI('http://192.168.1.9:9000/api/reviews'), win, fail, options)


    return

  createReviewCtrl
    .$inject = [
      '$scope',
      'CreateReview',
      '$stateParams',
      'MenuItem',
      'Menu',
      'Review',
      'ServerUrl'
    ]
  angular
    .module('app')
    .controller('createReviewCtrl', createReviewCtrl)

)()
