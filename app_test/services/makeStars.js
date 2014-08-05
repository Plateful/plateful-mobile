'use strict';
describe('makeStars', function(){
    var make
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(makeStars){

        make = makeStars.get
    }));
    // tests start here
    it('Should make a star rating based on a rating between 1 and 5', function(){

        expect( make(-0.01) ).toBe('');
        expect( make(0) ).toBe('');
        expect( make(0.001) ).toBe('');
        expect( make(0.24) ).toBe('');
        expect( make(0.25) ).toBe('½');
        expect( make(.76) ).toBe('★');
        expect( make(1.74) ).toBe('★½');
        expect( make(2.24) ).toBe('★★');
        expect( make(3.26) ).toBe('★★★½');
        expect( make(4.26) ).toBe('★★★★½');
        expect( make(5.01) ).toBe('★★★★★');

    });


});
