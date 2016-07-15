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
  console.log('product post: ', validateParams(req.body, productPostFormat));
  console.log('req.body: ', req.body);
  res.send('Hello, I am also here!');
});

module.exports = Router;


function validateParams(testObject, paramObject, paramVals){
  var checkParamVals = (arguments.length == 3);
  var testParams = props(paramObject);
  for (var i = 0; i <= testParams.length -1; i++) {
    let param = testParams[i];
    if(!testObject.hasOwnProperty(param)) return false;
    if(paramObject[param] == 'boolean' && boolTest(testObject[param])) testObject[param] = boolify(testObject[param]);
    if(paramObject[param] == 'number' && numTest(testObject[param])) testObject[param] = Number(testObject[param]);
    // console.log(param,': ', body[param], ', type: ', typeof body[param], ', expected type: ', paramObject[param]);
    if(typeof testObject[param] != paramObject[param]) return false;
    if((checkParamVals && paramVals.hasOwnProperty(param)) &&  testObject[param] != paramVals[param]) return false;
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