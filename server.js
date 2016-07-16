const express  = require('express');
const utils = require('./lib/helpers');
const logdb = require('./db/log_db');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'jade');
app.set('views','./templates');
// var u = utils();
var portNum = process.env.PORT || '3000';

/*  ROUTES  */
var pRoute = require ('./routes/products');
var aRoute = require ('./routes/articles');
var lRoute = require ('./routes/log');


/*  MIDDLEWARE  */
app.use(function(req, res, next) {
  console.log(utils.timeStamp(), ' ', req.method,' uri: ', req.url);
  logdb.write(utils.logEntry(req.method,req.url,req.socket.remoteAddress));
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/log', lRoute);
app.use('/articles', aRoute);
app.use('/products', pRoute);


app.get('/', function(req, res) {
  res.send(`I'm here!`);
});


var server = app.listen(portNum, function(){
  var host = 'localhost';

  console.log(`Example app listening at http://${host}:${portNum}`);
});