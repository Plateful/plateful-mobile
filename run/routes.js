(function() {
  var busboy, cors, errors;

  errors = require('./components/errors');

  cors = require('cors');

  busboy = require('connect-busboy');

  module.exports.applyRoutes = function(app) {
    app.use(cors());
    app.use(busboy({
      immediate: true
    }));
    app.use('/api/reviews', require('./api/review'));
    app.use('/api/items', require('./api/item'));
    app.use('/api/menus', require('./api/menu'));
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
    return app.route('/*').get(function(req, res) {
      return res.sendfile(app.get('appPath') + '/index.html');
    });
  };

}).call(this);
