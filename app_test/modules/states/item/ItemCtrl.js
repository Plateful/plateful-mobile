'use strict';
// beforeEach(function(){
//     localStorage.setItem('user_id', 39086);
// })

xdescribe('ItemCtrl', function(){
    var scope;//we'll use this scope in our tests
    var controller;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($controller, $rootScope){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ItemCtrl as vm', {$scope: scope});

    }));
    // tests start here


});
