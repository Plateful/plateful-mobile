'use strict';
xdescribe('MenuItem', function(){
    var scope;//we'll use this scope in our tests
    var item;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(MenuItem, $rootScope){
        //create an empty scope
        // scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        item = MenuItem

        // $controller('MainCtrl', {$scope: scope});
    }));
    // tests start here
    it('should have variable text = "Hello World!"', function(){
        // expect(scope.text).toBe('Hello World!');
        // expect(item.find()).toBe(15);
    });
});
