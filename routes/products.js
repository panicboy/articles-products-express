const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const productsDb = require('../db/products_db');
app.set('view engine', 'jade');
app.set('views','../templates');