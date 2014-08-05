(function() {
  function Auth($http, PromiseFactory){
    var Auth, USER_EMAIL_CACHE_KEY, USER_TOKEN_CACHE_KEY;
    USER_EMAIL_CACHE_KEY = "user_email";
    USER_TOKEN_CACHE_KEY = "user_token";
    return new (Auth = (function() {
      function Auth() {
        this.setAuthToken(localStorage.getItem(USER_EMAIL_CACHE_KEY), localStorage.getItem(USER_TOKEN_CACHE_KEY));
      }

      Auth.prototype.setAuthToken = function(email, token, user) {
        this.email = email != null ? email : null;
        this.token = token != null ? token : null;
        if (this.email && this.token) {
          $http.defaults.headers.common["X-User-Email"] = this.email;
          $http.defaults.headers.common["X-User-Token"] = this.token;
          localStorage.setItem(USER_EMAIL_CACHE_KEY, this.email);
          localStorage.setItem(USER_TOKEN_CACHE_KEY, this.token);
        } else {
          delete $http.defaults.headers.common["X-User-Email"];
          delete $http.defaults.headers.common["X-User-Token"];
          localStorage.removeItem(USER_EMAIL_CACHE_KEY);
          localStorage.removeItem(USER_TOKEN_CACHE_KEY);
        }
        return this.refreshUser(user);
      };

      Auth.prototype.refreshUser = function(user) {
        if (user == null) {
          user = null;
        }
        return this.user = user ? (user.$promise = PromiseFactory(user), user.$resolved = true, user) : this.email && this.token ? void 0 : null;
      };

      Auth.prototype.isSignedIn = function() {
        return !!this.token;
      };

      Auth.prototype.resetSession = function() {
        return this.setAuthToken(null, null);
      };

      return Auth;

  }
  Auth
    .$inect = ['$http', 'PromiseFactory']
  angular
    .module("app")
    .service('Auth', Auth)
})()
