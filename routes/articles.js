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

Router.get('/titles', (req, res) => {
  var titles = articlesDb.listTitles();
  res.send(titles);
});

Router.get('/:title', (req, res) => {
  let title = req.params.title;
  console.log('you want to get: ', title);
  // var titleString = decodeURI(req.params.title);
  articlesDb.getByTitle(title, (cb) => {
    res.send(cb);
  });
});

Router.put('/:title', (req, res) => {
  let title = req.params.title;
  let body = req.body;
  console.log('you want to edit: ', title);
  let articleUpdateSpec = utils.filterObject(body, articlesDb.getArticleSpec('full'));
  console.log('articleUpdateSpec: ', articleUpdateSpec, ', body: ', body);
  // check for bad request
  if(articleUpdateSpec === false || !utils.validateParams(body, articleUpdateSpec)) return res.status(404).json({ success: false });
  // var titleString = decodeURI(req.params.title);
  var indx = articlesDb.articleIndex(title);
  if(indx < 0) return res.status(404).json({ success: false }); // title not found
// send title & edited params
  articlesDb.updateArticle(indx, body, (cb) => {
    res.json({success: cb});
  });
});

Router.delete('/:title', (req, res) => {
  let title = req.params.title;
  console.log('you want to delete: ', title);
  // console.log('full spec: ', articlesDb.getArticleSpec('full'));
  // let articleUpdateSpec = utils.filterObject(body, articlesDb.getArticleSpec('full'));
  // console.log('body: ', body, ', articleUpdateSpec: ', articleUpdateSpec);
  // check for bad request
  // if(articleUpdateSpec === false || !utils.validateParams(body, articleUpdateSpec)) return res.status(404).json({ success: false });
  // var titleString = decodeURI(req.params.title);
  var indx = articlesDb.articleIndex(title);
  if(indx < 0) return res.status(404).json({ success: false }); // title not found
// send title & edited params
  articlesDb.deleteArticle(indx, (cb) => {
    res.json({success: cb});
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

Router.get('/', (req, res) => {
  res.send(articlesDb.all());
});

module.exports = Router;