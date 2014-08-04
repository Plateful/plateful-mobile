(function() {
  (function() {
    var MenusData;
    MenusData = function() {
      var data, geocoder;
      geocoder = new google.maps.Geocoder();
      data = [];
      return {
        get: function() {
          return data;
        },
        set: function(StateData) {
          return data = StateData;
        }
      };
    };
    return angular.module('app.modules.tabs.menus.services', []).service('MenusData', MenusData);
  })();

}).call(this);
