const express  = require('express');
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const productsDb = require('../db/products_db');
const Router = express.Router();
const app = express();
app.set('view engine', 'jade');
app.set('views','../templates');

Router.post('/', (req, res) => {
  // POST creates a new product
  var body = req.body;
  console.log('body: ', body);
  var expectedHeaders = { version: { format: 'number', value: '1.0'} };
  console.log('headers validated: ', validateParams(req.headers, expectedHeaders));
  var validated = validateParams(body, productsDb.getProductSpec());
  var productId = productsDb.newId();
  console.log('validated: ', validated, '; productId: ', productId);
  // add id to new product
  body.id = productId;
  productsDb.addProduct(body, (cb) => {
    res.json({success: cb});
  });
});

Router.get('/:id/edit', (req, res) => {
    console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
    return res.send('Dude, you totally want to edit a product');
  });

Router.get('/:id', (req, res) => {
  var pId = req.params.id;
  console.log(`You're looking for product id: `, pId);
    console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
    productsDb.getById(pId, (product) => {
      return res.send(product);
    });
  });

Router.get('/new', (req, res) => {
    console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
    res.send('One day you will be able to create a new product here.');
  });

Router.get('/', (req, res) => {
  console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
  // responds with HTML generated from your template which displays all Products added thus far.
      // file name: index.jade
  console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
  res.send('One day you will be seeing index.jade here.');

});

module.exports = Router;




function validateParams(theObject, paramSpecs){
  var testParams = props(paramSpecs);
  for (var i = 0; i <= testParams.length -1; i++) {
    let param = testParams[i];
    if(!theObject.hasOwnProperty(param)) return false;
    let oParam = theObject[param];
    var formatSpec = (paramSpecs[param].format ? paramSpecs[param].format : paramSpecs[param]);
    var valSpec = (paramSpecs[param].value ? paramSpecs[param].value : false);
    if(formatSpec == 'boolean' && boolTest(oParam)) oParam = boolify(oParam);
    if(formatSpec == 'number' && numTest(oParam)) oParam = Number(oParam);
    if(typeof oParam != formatSpec) return false;
    if(valSpec && oParam != valSpec) return false;
  }
  return true;
}

function coerceBoolean(theVal) {
  if(boolTest(theVal)) return boolify(theVal);
  return null;
}

function boolTest(theVal) {
  return (['true',true,'false', false].indexOf(theVal) >= 0);
}

function numTest(theVal) {
  return (Number(theVal) == theVal);
}

function boolify(theVal) {
  return (theVal == 'true' || theVal === true);
}

function props(obj) {
  return Object.getOwnPropertyNames(obj);
}

