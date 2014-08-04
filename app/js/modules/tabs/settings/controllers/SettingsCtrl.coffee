(->
  SettingsCtrl = ($scope, $ionicModal, Auth)->
    @initialize = =>



    # Logic goes here -->

    $ionicModal
      .fromTemplateUrl("js/modules/tabs/settings/views/login.html",
        scope: $scope
        animation: "slide-in-up"
      )
      .then (modal) =>
        @loginModal = modal
        return

    @openModal = =>

      @loginModal.show()

    @closeModal = =>

      @loginModal.hide()

    @login = =>
      Auth.setAuthToken(@username, @password)


    @initialize()
    return

  SettingsCtrl
    .$inject = ['$scope', '$ionicModal', 'Auth']
  angular
    .module('app.modules.tabs.settings.controllers', [])
    .controller('SettingsCtrl', SettingsCtrl)

)()
