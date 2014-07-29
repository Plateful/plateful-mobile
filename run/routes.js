(function() {
  var Item, Menu, Review, busboy, cors, errors, express;

  errors = require('./components/errors');

  cors = require('cors');

  busboy = require('connect-busboy');

  express = require('express');

  Item = require('./controllers/item.controller');

  Menu = require('./controllers/menu.controller');

  Review = require('./controllers/review.controller');

  module.exports.applyRoutes = function(app) {
    var Items, Menus, Reviews;
    app.use(cors());
    app.use(busboy({
      immediate: true
    }));
    Reviews = express.Router();
    Items = express.Router();
    Menus = express.Router();
    Items.get('/', Item.index);
    Items.get('/business/:menu_id', Item.getByMenu);
    Items.post('/location', Item.getByLocation);
    Items.get('/user/:user_id', Item.getByUser);
    Items.get('/:id', Item.show);
    Items.post('/', Item.create);
    Items.put('/:id', Item.update);
    Items.patch('/:id', Item.update);
    Items["delete"]('/:id', Item.destroy);
    Menus.get('/', Menu.index);
    Menus.get('/:id', Menu.show);
    Menus.post('/location', Menu.getByLocation);
    Menus.post('/', Menu.create);
    Menus.put('/:id', Menu.update);
    Menus.patch('/:id', Menu.update);
    Menus["delete"]('/:id', Menu.destroy);
    Reviews.get('/', Review.index);
    Reviews.get('/business/:menu_id', Review.getByMenu);
    Reviews.get('/user/:user_id', Review.getByUser);
    Reviews.get('/item/:item_id', Review.getByItem);
    Reviews.get('/:id', Review.show);
    Reviews.post('/', Review.create);
    Reviews.put('/:id', Review.update);
    Reviews.patch('/:id', Review.update);
    Reviews["delete"]('/:id', Review.destroy);
    app.use('/api/v1/reviews', Reviews);
    app.use('/api/v1/items', Items);
    app.use('/api/v1/menus', Menus);
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
    return app.route('/*').get(function(req, res) {
      return res.sendfile(app.get('appPath') + '/index.html');
    });
  };

}).call(this);
