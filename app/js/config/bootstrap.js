(function() {
  this.addElement = function(container, tagName, attrs) {
    var fjs, k, tag, v;
    if (attrs == null) {
      attrs = {};
    }
    if (attrs.id && container.getElementById(attrs.id)) {
      return container.getElementById(attrs.id);
    }
    fjs = container.getElementsByTagName(tagName)[0];
    tag = container.createElement(tagName);
    for (k in attrs) {
      v = attrs[k];
      tag[k] = v;
    }
    fjs.parentNode.insertBefore(tag, fjs);
    return tag;
  };




  Storage.prototype.setObject = function(key, value) {
    return this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function(key) {
    var value;
    if (!(value = this.getItem(key))) {
      return;
    }
    return JSON.parse(value);
  };

  if (window.GLOBALS == null) {
    window.GLOBALS = {};
  }

  window._RIPPLE = false;

  window._CORDOVA = !location.hostname;

  ionic.Platform.ready(function() {
    window._RIPPLE = window.tinyHippos !== void 0;
    window._CORDOVA = window.cordova !== void 0;
    window.currLocation = {
      coords: {
        accuracy: 30,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 37.783692599999995,
        longitude: -122.409235,
        speed: null
      }
    };
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

    return window.navigator.geolocation.getCurrentPosition(function(location) {
      window.currLocation = location;
      return console.log('Location from Phonegap', location);
    });
  });

}).call(this);
