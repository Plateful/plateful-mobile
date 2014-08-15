
/*
 *
 *   app.factories all are all the factories that primarily deal with
 *   Restful calls to the server
 *
 */

(function() {
  angular
    .module('app.factories', [
      'app.factory.menu',
      'app.factory.item',
      'app.factory.review',
      'app.factory.list',
      'app.factory.user',
      'app.factory.photo',
      'app.factory.fbLogin'
    ]);

}).call(this);
