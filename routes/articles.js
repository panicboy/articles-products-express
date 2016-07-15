const express  = require('express');
const Router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const productsDb = require('../db/products_db');
app.set('view engine', 'jade');
app.set('views','../templates');

Router.get('/', (req, res) => {
  res.send('Hi there!');
});

module.exports = Router;