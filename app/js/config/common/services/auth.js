(function() {

  var USER_ID_CACHE_KEY = "user_id";
  var USER_EMAIL_CACHE_KEY = "user_email";
  var USER_TOKEN_CACHE_KEY = "user_token";

  var Auth = function($http, PromiseFactory) {

    setAuthToken(localStorage.getItem(USER_ID_CACHE_KEY),
                 localStorage.getItem(USER_EMAIL_CACHE_KEY),
                 localStorage.getItem(USER_TOKEN_CACHE_KEY));


    return {
      setAuthToken: setAuthToken,
      refreshUser: refreshUser,
      isSignedIn: isSignedIn,
      resetSession: resetSession
    };

    function setAuthToken(id, email, token, fbtoken, user) {
      this.id = id !== null ? id : null;
      this.email = email !== null ? email : null;
      this.token = token !== null ? token : null;
      // Update fbtoken if there is a token value.
      if (fbtoken) {
        sessionStorage.setItem('fbtoken', fbtoken);
      }
      if (this.email && this.token) {
        $http.defaults.headers.common["X-User-Id"] = this.id;
        $http.defaults.headers.common["X-User-Email"] = this.email;
        $http.defaults.headers.common["X-User-Token"] = this.token;
        localStorage.setItem(USER_ID_CACHE_KEY, this.id);
        localStorage.setItem(USER_EMAIL_CACHE_KEY, this.email);
        localStorage.setItem(USER_TOKEN_CACHE_KEY, this.token);
      } else {
        delete $http.defaults.headers.common["X-User-Id"];
        delete $http.defaults.headers.common["X-User-Email"];
        delete $http.defaults.headers.common["X-User-Token"];
        localStorage.removeItem(USER_ID_CACHE_KEY);
        localStorage.removeItem(USER_EMAIL_CACHE_KEY);
        localStorage.removeItem(USER_TOKEN_CACHE_KEY);
      }
      return refreshUser(user);
    }

    function refreshUser(user) {
      if (user === null) {
        user = null;
      }
      return this.user = user ? (user.$promise = PromiseFactory(user), user.$resolved = true, user) : this.email && this.token ? void 0 : null;
    }

    function isSignedIn() {
      var id = localStorage.getItem('user_id');
      if(id) return true;
      return false;
    }

    function resetSession() {
      return setAuthToken(null, null);
    }
  };


  // return Auth;

  Auth.$inject = ['$http', 'PromiseFactory'];

  angular
    .module("app")
    .service('Auth', Auth);

}).call(this);
