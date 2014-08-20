
(function() {
  (function() {
    var ItemMapService = function(){
      var _storage = {};
      var instance = {
        set: set,
        get: get
      }
      return instance;

      ///////////

      function set(key, obj){
        _storage = {}
        _storage[key] = obj
      }

      function get(key){
        if(key){
          return _storage[key];
        }
        return _storage;
      }
    }
    return angular.module('app').service('ItemMapService', ItemMapService);
  })();

}).call(this);
