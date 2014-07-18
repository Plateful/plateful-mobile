app = angular.module("clurtch")

# app.constant('ServerUrl', 'http://10.8.29.210:9000/')
# app.constant('ServerUrl', 'http://192.168.1.9:9000/')
app.constant('ServerUrl', 'http://localhost:9000/')

ionic.Platform.ready ->
  app.config ($provide, $httpProvider) ->
    # Add support for PATCH requests
    $httpProvider.defaults.headers.patch ||= {}
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/json'

    $httpProvider.interceptors.push ($injector, $q) ->
      responseError: (response) ->
        console.log "httperror: ", response.status unless GLOBALS.ENV == "test"
        if response.status == 401
          $injector.invoke (Auth) ->
            Auth.setAuthToken(null)
        $q.reject(response)

  # Now, finally, let's run the app
  # (this is the reason why we don't include ng-app in the index.jade)
  angular.bootstrap document, ['clurtch']


app.run ($rootScope, Auth, $window, $timeout) ->
  console.log 'Ionic app has just started (app.run)!' unless GLOBALS.ENV == "test"

  # Make GLOBALS visible in every scope.
  $rootScope.GLOBALS = GLOBALS

  # Useful for debugging, like `$a("$rootScope")`
  $timeout ->
    $window.$a = angular.element(document.body).injector()?.get

  # Make current_user and current_festival visible in every scope.
  $rootScope.$watch (-> Auth.user?.id), ->
    $rootScope.current_user = Auth.user

  $timeout ->
    # Finally, let's show the app ;)
    navigator.splashscreen?.hide()
