var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
// Local DB
// mongoose.connect('mongodb://localhost:27017/shoppingcart');

// MLab DB
mongoose.connect('mongodb://test:test@ds231758.mlab.com:31758/shopping_cart_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// <--- SETUP SESSIONS ---> //
app.use(session ({
  secret: 'mySecretString',
  saveUnitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

// SAVE TO SESSION
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if(err) {
      console.log('# API SAVE TO SESSION', err);
    }
    res.json(req.session.cart)
  })
})

// GET SESSION CART API
app.get('/cart', function(req, res) {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart)
  }
})


var Products = require('./models/products.js');

// <--- POST Products ---> //
app.post('/products', function(req, res){
  var product = req.body;

  Products.create(product, function(err, products){
    if(err) {
      console.log('# API POST PRODUCTS', err);
    }
    res.json(products);
  })
})

// <--- GET Products ---> //
app.get('/products', function(req, res) {
  Products.find(function(err, products) {
      if(err) {
        console.log('# API GET PRODUCTS', err);
      }
      res.json(products);
  })
})

// <--- DELETE Products ---> //
app.delete('/products/:_id', function(req, res) {
  var query = {_id: req.params._id}
  Products.remove(query, function(err, products) {
      if(err) {
      }
      res.json(products);
  })
})

// <--- GET Products Images API ---> //
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files) {
      if(err) {
        console.error(err);
      }

      const filesArr = [];
      files.forEach(function(file) {
        filesArr.push({filename: file})
      })
      res.json(filesArr);
  })
})

// *** END API's *** //

app.listen(3001, function(err) {
  if(err) {
    console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001')
})