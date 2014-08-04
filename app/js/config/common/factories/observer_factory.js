(function() {
  var __slice = [].slice;

  angular.module('app').factory('ObserverFactory', function() {
    var ObserverFactory;
    return ObserverFactory = (function() {
      function ObserverFactory() {
        this.listeners = {};
      }

      ObserverFactory.prototype.on = function(eventName, listener) {
        var _base;
        if ((_base = this.listeners)[eventName] == null) {
          _base[eventName] = [];
        }
        return this.listeners[eventName].push(listener);
      };

      ObserverFactory.prototype.once = function(eventName, listener) {
        listener.__once__ = true;
        return this.on(eventName, listener);
      };

      ObserverFactory.prototype.off = function(eventName, listener) {
        var i, v, _i, _len, _ref, _results;
        if (!this.listeners[eventName]) {
          return;
        }
        if (!listener) {
          return delete this.listeners[eventName];
        }
        _ref = this.listeners[eventName];
        _results = [];
        for (v = _i = 0, _len = _ref.length; _i < _len; v = ++_i) {
          i = _ref[v];
          if (this.listeners[eventName] === listener) {
            this.listeners.splice(i, 1);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      ObserverFactory.prototype.fireEvent = function() {
        var eventName, params, v, _i, _len, _ref, _ref1, _results;
        eventName = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!((_ref = this.listeners[eventName]) != null ? _ref.length : void 0)) {
          return;
        }
        _ref1 = this.listeners[eventName];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          v.apply(this, params);
          if (v.__once__) {
            _results.push(this.off(eventName, v));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return ObserverFactory;

    })();
  });

}).call(this);
