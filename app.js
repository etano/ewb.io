var fs = require('fs')
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var rfs = require('rotating-file-stream');

var app = express();

// logs
var log_directory = path.join(__dirname, 'log');
if (!fs.existsSync(log_directory)) { fs.mkdirSync(log_directory); }
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: log_directory
});

// middleware
app.use(morgan('combined', {stream: accessLogStream}))
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.get('/', (req, res) => res.render('index.html'));

// run
if(!module.parent) {
  var port = 1985; // Year of the Ox!
  app.listen(port, () => console.log('Running on port '+port));
}
