(function() {
  'use strict';
  module.exports = {
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || void 0,
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
  };

}).call(this);
