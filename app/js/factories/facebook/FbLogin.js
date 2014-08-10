(function() {

  var FbLogin;
  FbLogin = function(Restangular, $q, Auth) {
    // Defaults to sessionStorage for storing the Facebook token
    openFB.init({appId: '1495225764050843'});
    console.log("i'm in");
    FbUser = Restangular.all('users');

    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

    return {
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

      logout: function() {
        openFB.logout(
          function() {
            alert('Logout successful');
          },
          this.errorHandler);
      },

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

      getStatus: function() {
        var status;
        openFB.getLoginStatus(function(foundStatus) {
          status = foundStatus.status;
        });
        return status;
      },

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
            fbUser.getInfo();
          })
          .catch(function(error) {
            console.log('Error: ', error);
          })
      }


    };
  };
  FbLogin.$inject = ['Restangular', '$q', 'Auth'];
  angular.module('app.factory.fbLogin', []).factory('FbLogin', FbLogin);
})();
