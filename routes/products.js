const express  = require('express');
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const productsDb = require('../db/products_db');
const logdb = require('../db/log_db');
const Router = express.Router();
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));
app.set('view engine', 'jade');


/*  >>> DAS MIDDLEWARE <<<  */
Router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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
  body.priceString = utils.currencyString(body[price]);
  productsDb.addProduct(body, (cb) => {
    res.json({success: cb});
  });
});


/*  RENDERING  */
Router.get('/:id/edit', (req, res) => {
    return res.send(`Dude, you totally want to edit a product with ID '${req.params.id}'`);
  });

Router.get('/edit/:id/:thingtoedit', (req, res) => {
  let pId = req.params.id;
  let itemToEdit = req.params.thingtoedit;

    productsDb.getById(pId, (product) => {
      let itemVal = product[itemToEdit];
      console.log(`${itemToEdit}: `, product[itemToEdit]);
      res.render('../templates/products/edit', {product, itemToEdit, itemVal});
    });
  });

Router.get('/new', (req, res) => {
    res.send(`One day you will be able to create a new product here, just like if you used POST. But it'll be SOOOOOO much nicer, 'cause it'll be all HTML'd up.`);
  });

Router.get('/:id', (req, res) => {
  var pId = Number(req.params.id);
    productsDb.getById(pId, (product) => {
      console.log('product: ', product);
      product.priceString = utils.currencyString(product[price]);
      res.render('../templates/products/item', {product});
    });
  });

Router.get('/', (req, res) => {
  let productList = productsDb.getAll();
  if(productList) res.render('../templates/products/index', {productList});
  //   return res.send(productList);
  });

Router.put('/:id', (req, res) => {
  let pId = Number(req.params.id);
  let productUpdateSpec = utils.filterObject(req.body, productsDb.getProductSpec('full'));
  if(productUpdateSpec === false || !utils.validateParams(req.body, productUpdateSpec)) {
    logdb.write(utils.logEntry(req.method,req.url,req.socket.remoteAddress, 'product update not validated'));
    console.log(`Product update not validated.`);
    return res.json({ success: false });
  }
    productsDb.updateProduct(pId, req.body, (result) => {
      productsDb.getById(pId, (product) => {
        console.log(`updated: ${result}; product: ${result}`);
      });
      return res.json({ success: result });
    });
  });

module.exports = Router;