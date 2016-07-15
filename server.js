const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'jade');
app.set('views','./templates');
var portNum = process.env.PORT || '3000';

/*  ROUTES  */
var pRoute = require ('./routes/products');
var aRoute = require ('./routes/articles');

/*  MIDDLEWARE  */
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/articles', aRoute);
// app.use('/products', pRoute);

app.get('/', function(req, res) {
  res.send(`I'm here!`);
});


var server = app.listen(portNum, function(){
  var host = 'localhost';

  console.log(`Example app listening at http://${host}:${portNum}`);
});