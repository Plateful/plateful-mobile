
/*
 *
 *   app.factories all are all the factories that primarily deal with
 *   Restful calls to the server
 *
 *   SOURCE OF TRUTH
 *
 */

(function() {
  angular
    .module('app.models', [
      'app.model.menu',
      'app.model.item',
      'app.model.review',
      'app.model.user',
      'app.model.photo',
      'app.model.fbLogin'
    ]);
}).call(this);
