
/*
 *
 *   app.factories all are all the factories that primarily deal with
 *   Restful calls to the server
 *
 */

(function() {
  angular
    .module('app.models', [
      'app.models.menu',
      'app.models.item',
      'app.models.review',
      'app.models.user',
      'app.models.photo',
      'app.models.fbLogin'
    ]);

}).call(this);
