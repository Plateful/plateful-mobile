'use strict';
describe('findDistance', function(){

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(findDistance){

        var find = findDistance

    }));
    // tests start here
    it('Should Calculate the distance in Miles', function(){

        // expect().toBeDefined();

    });


});
