'use strict';
describe('ItemCtrl', function(){
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
    it('Should have an initialize function', function(){

        expect(scope.vm.initialize).toBeDefined();

    });
    it('Should a $stateParam set to item_id on the scope', function(){

        // expect(scope.vm.item_id).toBeDefined();

    });
    it('Should a showPhotos function on the scope', function(){

        expect(scope.vm.showPhotos).toBeDefined();

    });
    it('Should a showReviews function on the scope', function(){

        expect(scope.vm.showReviews).toBeDefined();

    });
    it('Should a reviewItem function on the scope', function(){

        expect(scope.vm.reviewItem).toBeDefined();

    });
    it('Should a collectItem function on the scope', function(){

        expect(scope.vm.collectItem).toBeDefined();

    });
    it('Should a bookmarkItem function on the scope', function(){

        expect(scope.vm.bookmarkItem).toBeDefined();

    });

});
