'use strict';
describe('Menu', function(){
    var scope;//we'll use this scope in our tests
    var menu;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(Menu, $rootScope){
        //create an empty scope
        // scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        menu = Menu
        // $controller('MainCtrl', {$scope: scope});
    }));
    // tests start here
    it('Should have a get method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(menu.get).toBeDefined();
    });
    it('Should have a find method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(menu.find).toBeDefined();
    });
    it('Should have a create method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(menu.create).toBeDefined();
    });
    it('Should have an update method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(menu.update).toBeDefined();
    });
    it('Should have a destroy method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(menu.destroy).toBeDefined();
    });
});
