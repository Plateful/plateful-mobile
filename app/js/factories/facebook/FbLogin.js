(function() {

  var FbLogin;
  FbLogin = function(Restangular, $q, Auth, User) {
    // Defaults to sessionStorage for storing the Facebook token
    openFB.init({appId: '1495225764050843'});
    console.log("i'm in");
    FbUser = Restangular.all('users');

    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

    return {
      status: undefined,

      // Submits log-in request to facebook.
      login: function() {
        var deferred = $q.defer()
        openFB.login(function(response) {
            if(response.status === 'connected') {
              alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
              return deferred.resolve();
            }
            else {
              alert('Facebook login failed: ' + response.error);
              return deferred.reject();
            }
          }, {scope: 'email,read_stream,publish_stream'});
        return deferred.promise;
      },

      // Logs out a facebook connected user.
      logout: function() {
        openFB.logout(
          function() {
            User.logout();
            User.status = "Logged out from Facebook.";
            this.getStatus();
          }.bind(this),
          this.errorHandler);
      },

      // Gets Facebook user information and sets items on view.
      getInfo: function() {
        openFB.api({
          path: '/me',
          // params: {fields: 'id, name, email'},
          success: function(data) {
            console.log("yo ",JSON.stringify(data));
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?width=150&height=150';
          },
          error: this.errorHandler
        });
      },

      // Gets Facebook connection status of the user.
      getStatus: function() {
        openFB.getLoginStatus(function(foundStatus) {
          this.status = foundStatus.status;
        }.bind(this));
      },

      // Posts an item to Facebook. Currently not working due to admin accoun restrictions.
      share: function() {
        openFB.api({
          method: 'POST',
          path: '/me/feed',
          params: {
            message: 'Testing Facebook APIs'
          },
          success: function() {
            alert('the item was posted on Facebook');
          },
          error: this.errorHandler
        });
      },

      errorHandler: function(error) {
        alert(error.message);
      },

      // Sends request to server for long term Facebook token.
      // Returns user with updated info or new user.
      getFbToken: function(dataToStore) {
        var dataToStore = dataToStore || {}
        dataToStore.token = window.sessionStorage.fbtoken;
        dataToStore.username = window.localStorage.username;
        return Restangular.all('users').all('fb-login')
          .post(dataToStore)
          .then(function (response) {
            console.log(response);
            Auth.setAuthToken(data.username, data.token, data.fbSessionId, data);
          })
          .catch(function(error) {
            console.log('uh oh');
          })

      },

      // Gets Facebook user data to store in database.
      getFbUserCreationData: function() {
        var deferred = $q.defer();
        openFB.api({
          path: '/me',
          params: {fields: 'id, name, email'},
          success: function(data) {
            return deferred.resolve(data);
          },
          error: this.errorHandler
        });
        return deferred.promise;
      },

      // Starts Facebook login, requests long term token from Facebook and stores
      // Facebook token and data in database.
      loginFlow: function () {
        var fbUser = this;
        this.login()
          .then(function(){
            return fbUser.getFbUserCreationData()
          })
          .then(function(data){
            var paramsToStore = {};
            paramsToStore.fbId = data.id;
            paramsToStore.email = data.email;
            paramsToStore.photo = 'http://graph.facebook.com/' + data.id + '/picture?width=150&height=150';
            return fbUser.getFbToken(paramsToStore)
          })
          .then(function(){
            User.status = "Facebook connected!";
            fbUser.getInfo();
            fbUser.getStatus();
          })
          .catch(function(error) {
            User.status = "An error occurred logging in with Facebook. Please try again.";
            console.log('Error: ', error);
          })
      }


    };
  };
  FbLogin.$inject = ['Restangular', '$q', 'Auth', 'User'];
  angular.module('app.factory.fbLogin', []).factory('FbLogin', FbLogin);
})();
