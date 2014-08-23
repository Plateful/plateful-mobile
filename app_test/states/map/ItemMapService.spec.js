'use strict';
xdescribe('ItemMapService', function(){
    var service;
    var obj = {
      key: "sotrageKey",
      obj: {value1: "value1", value2: "value2"}
    }
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('app'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function(ItemMapService){

        service = ItemMapService

    }));
    // tests start here
    it('Should set objects in storage by passing in a key and obj', function(){
        service.set(obj.key, obj.obj)
        var result = service.get(obj.key)
        expect(result.value1).toBe("value1");
        // expect(service.set).toBeDefined();

    });


});
