const express  = require('express');
const fs = require('fs');
const utils = require('../lib/helpers');
const bodyParser = require('body-parser');
const logdb = require('../db/log_db');
const Router = express.Router();
const app = express();
var logPath = 'logs/';
app.set('view engine', 'jade');


Router.get('/all/arr', (req, res) => {
  // POST creates a new product
  var theLog = logdb.get('array');
  res.send(theLog);
});
Router.get('/all', (req, res) => {
  // POST creates a new product
  var theLog = logdb.get('<br>');
  res.send(theLog);
});

Router.get('/save', (req, res) => {
  // POST creates a new product
  var theLog = logdb.get();
  var logStamp = utils.timeStamp('-', '_', '-');
  if(theLog.length > 10){
    fs.writeFile(logPath + logStamp + '.log', theLog, (err) => {
      if (err) return res.send(err);
      return res.send('log written to file.');
    });
  }
});


module.exports = Router;

