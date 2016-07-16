const express  = require('express');
const Router = express.Router();
const app = express();
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
app.set('view engine', 'jade');
app.set('views','../templates');

Router.get('/', (req, res) => {
  res.send('Hi there!');
});

Router.get('/titles', (req, res) => {
  var titles = articlesDb.listTitles();
  res.send(titles);
});

Router.get('/:title', (req, res) => {
  var titleString = decodeURI(req.params.title);
  articlesDb.getByTitle(titleString, (cb) => {
    res.send(cb);
  });
});

Router.post('/', (req, res) => {
  // POST creates a new product
  var body = req.body;
  // var expectedHeaders = { version: { format: 'number', value: '1.0'} };
  var validated = utils.validateParams(body, articlesDb.getArticleSpec());
  console.log('validated: ', validated, '; title: ', body.title);
  // add id to new product
  body.urlTitle = encodeURI(body.title);
  articlesDb.add(body, (cb) => {
    res.json({success: cb});
  });
});

module.exports = Router;