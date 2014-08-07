(->
  ReviewItemCtrl = ($scope, CreateReview, MenuItem, $stateParams)->

    @menu_id = $stateParams.menu_id

    CreateReview.set('menu', $scope.menu_id)

    @review = CreateReview.get()

    Menu
      .find(@menu_id)
      .success((data) =>
        console.log "neo----", data[0][1]
        $scope.menu = data[0][0]
        if Array.isArray(data[0][1])
          @items = data[0][1]
          console.log $scope.items
        else
          @items.push(data[0][1])
        $ionicLoading.hide()
      )

    return

  ReviewItemCtrl.$inject = [
    '$scope'
    'CreateReview'
    'MenuItem'
    '$stateParams']
  angular
    .module('app.modules.tabs.review')
    .controller('ReviewItemCtrl', ReviewItemCtrl)
)()
