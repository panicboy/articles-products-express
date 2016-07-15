const express  = require('express');
const Router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const articlesDb = require('../db/articles_db');
const productsDb = require('../db/products_db');
app.set('view engine', 'jade');
app.set('views','../templates');

Router.post('/', (req, res) => {
  // POST creates a new product
  var productPostFormat = { name: 'string', price: 'string', inventory: 'number' };
  var validated = validateParams(req.body, productPostFormat);
  // add id to new product
  console.log('body: ', req.body);
  res.json({success: `${validated}`});
});

Router.get('/*/edit', (req, res) => {
    console.log('method: ', req.method, ', body: ', req.body, ', URL: ', req.originalUrl);
    return res.send('Dude, you totally want to edit a product');
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




function validateParams(theObject, paramSpecs, paramVals){
  var checkParamVals = (arguments.length == 3);
  var testParams = props(paramSpecs);
  for (var i = 0; i <= testParams.length -1; i++) {
    let param = testParams[i];
    if(!theObject.hasOwnProperty(param)) return false;
    let oParam = theObject[param];
    if(paramSpecs[param] == 'boolean' && boolTest(oParam)) oParam = boolify(oParam);
    if(paramSpecs[param] == 'number' && numTest(oParam)) oParam = Number(oParam);
    // console.log(param,': ', body[param], ', type: ', typeof body[param], ', expected type: ', paramSpecs[param]);
    if(typeof oParam != paramSpecs[param]) return false;
    if((checkParamVals && paramVals.hasOwnProperty(param)) &&  oParam != paramVals[param]) return false;
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