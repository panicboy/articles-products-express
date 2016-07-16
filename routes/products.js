const express  = require('express');
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const productsDb = require('../db/products_db');
const Router = express.Router();
const app = express();
app.set('view engine', 'jade');


Router.post('/', (req, res) => {
  // POST creates a new product
  if(!utils.validateParams(req.body, productsDb.getProductSpec())) {
    logdb.write(utils.logEntry(req.method,req.url,req.socket.remoteAddress, 'post not validated'));
    console.log('Product POST not validated. productId: ', productId);
    return res.json({ success: false });
  }
  var body = req.body;
  var productId = productsDb.newId();
  console.log('Product POST validated. productId: ', productId);
  // add id to new product
  body.id = productId;
  productsDb.addProduct(body, (cb) => {
    res.json({success: cb});
  });
});

Router.get('/:id/edit', (req, res) => {
    return res.send('Dude, you totally want to edit a product');
  });

Router.get('/new', (req, res) => {
    res.send(`One day you will be able to create a new product here, just like if you used POST. But it'll be SOOOOOO much nicer, 'cause it'll be all HTML'd up.`);
  });

Router.get('/:id', (req, res) => {
  var pId = Number(req.params.id);
  console.log(`You're looking for product id: `, pId);
    productsDb.getById(pId, (product) => {
      return res.send(product);
    });
  });

Router.get('/', (req, res) => {
  let productList = productsDb.getAll();
  if(productList) return res.send(productList);
  return res.json({success: productList});
  // responds with HTML generated from your template which displays all Products added thus far.
      // file name: index.jade
  // res.send('One day you will be seeing index.jade here.');
  });

Router.put('/:id', (req, res) => {
  var pId = Number(req.params.id);
    productsDb.updateProduct(pId, req.body, (result) => {
      return res.json({ success: result });
    });
  });

module.exports = Router;