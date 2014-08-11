'use strict';
describe('User', function(){
    var scope;//we'll use this scope in our tests
    var user;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(User, $rootScope){
        //create an empty scope
        // scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        user = User
        // $controller('MainCtrl', {$scope: scope});
    }));
    // tests start here
    it('Should have a get method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.get).toBeDefined();
    });
    it('Should have a find method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.find).toBeDefined();
    });
    it('Should have a create method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.create).toBeDefined();
    });
    it('Should have an update method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.update).toBeDefined();
    });
    it('Should have a destroy method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.destroy).toBeDefined();
    });
    it('Should have a getPhotosByUser method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.getPhotosByUser).toBeDefined();
    });
    it('Should have a getBookmarksByUser method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.getBookmarksByUser).toBeDefined();
    });
    it('Should have a getCollectionByUser method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.getCollectionByUser).toBeDefined();
    });
    it('Should have a getReviewsByUser method', function(){
        // expect(scope.text).toBe('Hello World!');
        expect(user.getReviewsByUser).toBeDefined();
    });
    it('Should have a signup method', function(){
        expect(user.signup).toBeDefined();
    });
    it('Should have a login method', function(){
        expect(user.login).toBeDefined();
    });
});
