
/*
 *
 *   app.factories all are all the factories that primarily deal with
 *   Restful calls to the server
 *
<<<<<<< HEAD
<<<<<<< HEAD
 *   SOURCE OF TRUTH
 *
=======
>>>>>>> Architecture Update: Convert all modules | app.factories - to - app.models
=======
 *   SOURCE OF TRUTH
 *
>>>>>>> mend
 */

(function() {
  angular
    .module('app.models', [
      'app.model.menu',
      'app.model.item',
      'app.model.review',
      'app.model.list',
      'app.model.user',
      'app.model.photo',
      'app.model.fbLogin'
    ]);
}).call(this);
