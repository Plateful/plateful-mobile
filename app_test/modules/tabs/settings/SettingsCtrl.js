'use strict';
describe('SettingsCtrl', function(){
  var scope;//we'll use this scope in our tests
  var controller;
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('app'));
  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    //create an empty scope
    scope = $rootScope.$new();
    //declare the controller and inject our empty scope
    $controller('SettingsCtrl as vm', {$scope: scope});

  }));
  // tests start here
  it('Should have a login function', function(){
    expect(scope.vm.login).toBeDefined();
  });

  it('Should have a signup function', function(){
    expect(scope.vm.signup).toBeDefined();
  });
});
