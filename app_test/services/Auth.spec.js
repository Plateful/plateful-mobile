'use strict';
describe('Auth', function(){
    var auth
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(Auth){

        auth = Auth;
        Auth.setAuthToken('joelcox@hisimagination.com', '111222333444555', 'joelcoxokc');
    }));
    it('Should Store a session token and email of the user on login', function(){

        var email = localStorage.getItem('user_email');
        var token = localStorage.getItem('user_token');
        expect(email).toBe('joelcox@hisimagination.com');
        expect(token).toBe('111222333444555');

    });
    it('Should has an is Signed in method', function(){

      expect(auth.isSignedIn).toBeDefined();

    });
    it('Should have a refreshSession method', function(){

      expect(auth.resetSession).toBeDefined();

    });
    it('Should Is SignedIn Should return true if user is signed in', function(){
      expect(auth.isSignedIn()).toBe(true);
    });
    it('Resest Session should remove any user properties from local storage', function(){
      auth.resetSession()
      var email = localStorage.getItem('user_email');
      var token = localStorage.getItem('user_token');
      expect(email).toBe(null);
      expect(token).toBe(null);
    });

});
