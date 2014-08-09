(function() {

  var FbLogin;
  FbLogin = function(Restangular) {
    // Defaults to sessionStorage for storing the Facebook token
    openFB.init({appId: '1495225764050843'});
    console.log("i'm in");

    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

    return {
      login: function() {
        openFB.login(function(response) {
            if(response.status === 'connected') {
              alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
            } 
            else {
              alert('Facebook login failed: ' + response.error);
            }
          }, {scope: 'email,read_stream,publish_stream'});
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
          success: function(data) {
            console.log("yo ",JSON.stringify(data));
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
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
      }

    };
  };
  FbLogin.$inject = ['Restangular'];
  return angular.module('app.factory.fbLogin', []).factory('FbLogin', FbLogin);
})();
