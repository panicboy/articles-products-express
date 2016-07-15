const express  = require('express');
const Router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const productsDb = require('../db/products_db');
app.set('view engine', 'jade');
app.set('views','../templates');

Router.get('/', (req, res) => {
  res.send('Hello, I am also here!');
});

Router.post('/', (req, res) => {
  var productPostFormat = { name: 'string', price: 'string', inventory: 'number' };
  console.log('req.body: ', req.body);
  res.send('Hello, I am also here!');
});

module.exports = Router;

var productPostFormat = { name: 'string', price: 'string', inventory: 'number' };