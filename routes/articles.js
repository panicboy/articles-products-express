const express  = require('express');
const Router = express.Router();
const app = express();
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const logdb = require('../db/log_db');
const expectedHeaders = { version: { format: 'string', value: '1.0'} };
app.set('view engine', 'jade');
app.set('views','../templates');


/*  MIDDLEWARE  */
Router.all('*', (req, res, next) => {
  if(utils.validateParams(req.headers, expectedHeaders)) return next();
  logdb.write(utils.logEntry(req.method,req.url,req.socket.remoteAddress, 'header not validated'));
  return res.json({ "error": "bad headers" });
});

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
  // POST creates a new article
  var body = req.body;
  var validated = utils.validateParams(body, articlesDb.getArticleSpec());
  console.log('validated: ', validated, '; title: ', body.title);
  // add encoded title to new article
  body.urlTitle = encodeURI(body.title);
  articlesDb.add(body, (cb) => {
    res.json({success: cb});
  });
});

module.exports = Router;