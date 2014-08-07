'use strict';
describe('ListCtrl', function(){
    var scope;//we'll use this scope in our tests
    var controller;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($controller, $rootScope){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('ListCtrl as vm', {$scope: scope});

    }));
    // tests start here
    it('Should have a login function on the scope', function(){

        expect(scope.vm.login).toBeDefined();

    });
    it('Should have a showPhotos function on the scope', function(){

        expect(scope.vm.showPhotos).toBeDefined();

    });
    it('Should have a showCollection function on the scope', function(){

        expect(scope.vm.showCollection).toBeDefined();

    });
    it('Should have a showBookmarks function on the scope', function(){

        expect(scope.vm.showBookmarks).toBeDefined();

    });

});
